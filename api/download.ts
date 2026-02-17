import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  maxDuration: 15,
};

interface PipedStream {
  url: string;
  format: string;
  quality: string;
  mimeType: string;
  bitrate: number;
  contentLength: number;
}

interface PipedResponse {
  title: string;
  audioStreams: PipedStream[];
}

const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',
  'https://pipedapi.adminforge.de',
  'https://pipedapi.r4fo.com',
  'https://pipedapi.in.projectsegfau.lt',
];

async function tryPiped(instance: string, videoId: string): Promise<PipedResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${instance}/streams/${videoId}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BulBeats/1.0' },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    if (data.audioStreams && data.audioStreams.length > 0) {
      return data as PipedResponse;
    }
    return null;
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { videoId } = req.body;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'videoId is required' });
  }

  const errors: string[] = [];

  for (const instance of PIPED_INSTANCES) {
    try {
      const data = await tryPiped(instance, videoId);

      if (data && data.audioStreams.length > 0) {
        // Sort by bitrate, pick highest quality
        const sorted = [...data.audioStreams].sort((a, b) => b.bitrate - a.bitrate);
        const best = sorted[0];
        const title = data.title.replace(/[<>:"/\\|?*]/g, '');

        return res.status(200).json({
          status: 'ok',
          url: best.url,
          filename: `${title}.mp3`,
          bitrate: Math.round(best.bitrate / 1000),
        });
      }

      errors.push(`${instance}: no audio streams`);
    } catch (e) {
      errors.push(`${instance}: ${e instanceof Error ? e.message : 'failed'}`);
    }
  }

  return res.status(502).json({
    status: 'error',
    error: 'No se pudo obtener el audio. Intenta de nuevo.',
    debug: errors,
  });
}
