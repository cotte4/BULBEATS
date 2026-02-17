import type { VercelRequest, VercelResponse } from '@vercel/node';

const COBALT_INSTANCES = [
  'https://api.cobalt.tools',
  'https://cobalt-api.kwiatekmiki.com',
  'https://cobalt.api.timelessnesses.me',
];

async function tryInstance(url: string, videoId: string): Promise<Response> {
  return fetch(`${url}/`, {
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
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

      if (data.status === 'error') {
        continue;
      }
    } catch {
      continue;
    }
  }

  return res.status(502).json({
    error: 'No se pudo obtener el audio. Intenta de nuevo mas tarde.',
  });
}
