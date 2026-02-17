import type { VercelRequest, VercelResponse } from '@vercel/node';
import ytdl from '@distube/ytdl-core';

export const config = {
  maxDuration: 30,
};

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

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
      },
    });

    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'No se encontraron formatos de audio.',
      });
    }

    audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
    const best = audioFormats[0];

    const title = info.videoDetails.title.replace(/[<>:"/\\|?*]/g, '');

    return res.status(200).json({
      status: 'ok',
      url: best.url,
      filename: `${title}.${best.container || 'webm'}`,
      format: best.container,
      bitrate: best.audioBitrate,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Download error:', message);
    return res.status(502).json({
      status: 'error',
      error: 'No se pudo obtener el audio. YouTube puede estar bloqueando.',
      debug: message,
    });
  }
}
