import { useState } from 'react';

interface DownloadStatus {
  msg: string;
  type: 'loading' | 'success' | 'error';
}

const COBALT_INSTANCES = [
  'https://cobalt-backend.canine.tools',
  'https://cobalt-api.meowing.de',
  'https://capi.3kh0.net',
];

async function tryCobaltDirect(videoId: string): Promise<string | null> {
  const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;

  for (const instance of COBALT_INSTANCES) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${instance}/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: ytUrl,
          downloadMode: 'audio',
          audioFormat: 'mp3',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await res.json();

      if (data.status === 'tunnel' || data.status === 'redirect') {
        return data.url;
      }
    } catch {
      continue;
    }
  }
  return null;
}

async function tryServerProxy(videoId: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await res.json();

    if (data.status === 'tunnel' || data.status === 'redirect') {
      return data.url;
    }
  } catch {
    // Server proxy failed
  }
  return null;
}

export function useDownload() {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);

  const handleDownload = async (videoId: string, title: string) => {
    setDownloadStatus({ msg: 'Preparando descarga...', type: 'loading' });

    // Tier 1: Try direct Cobalt calls from browser (fastest)
    let downloadUrl = await tryCobaltDirect(videoId);

    // Tier 2: Try our serverless proxy
    if (!downloadUrl) {
      setDownloadStatus({ msg: 'Intentando otra via...', type: 'loading' });
      downloadUrl = await tryServerProxy(videoId);
    }

    // If we got a URL, trigger the download
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.mp3`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus({ msg: 'Descarga iniciada!', type: 'success' });
      setTimeout(() => setDownloadStatus(null), 2500);
      return;
    }

    // Tier 3: Copy YouTube URL to clipboard and tell user to use cobalt.tools
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
      await navigator.clipboard.writeText(ytUrl);
      window.open('https://cobalt.tools/', '_blank');
      setDownloadStatus({
        msg: 'Link copiado! Pegalo en cobalt.tools',
        type: 'error',
      });
    } catch {
      window.open(ytUrl, '_blank');
      setDownloadStatus({
        msg: 'Descarga desde YouTube directamente',
        type: 'error',
      });
    }
    setTimeout(() => setDownloadStatus(null), 4000);
  };

  return { downloadStatus, handleDownload };
}
