import type { VercelRequest, VercelResponse } from '@vercel/node';

const COBALT_INSTANCES = [
  'https://cobalt-backend.canine.tools',
  'https://cobalt-api.meowing.de',
  'https://capi.3kh0.net',
];

async function tryInstance(instanceUrl: string, videoId: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    return await fetch(`${instanceUrl}/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://www.youtube.com/watch?v=${videoId}`,
        downloadMode: 'audio',
        audioFormat: 'mp3',
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
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

  for (const instance of COBALT_INSTANCES) {
    try {
      const response = await tryInstance(instance, videoId);
      const data = await response.json();

      if (data.status === 'tunnel' || data.status === 'redirect') {
        return res.status(200).json({
          status: data.status,
          url: data.url,
          filename: data.filename,
        });
      }
    } catch {
      continue;
    }
  }

  return res.status(502).json({
    status: 'fallback',
    error: 'No se pudo obtener el audio desde el servidor.',
  });
}
