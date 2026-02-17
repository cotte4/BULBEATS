import { useState } from 'react';

interface DownloadStatus {
  msg: string;
  type: 'loading' | 'success' | 'error';
}

export function useDownload() {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);

  const handleDownload = async (videoId: string, title: string) => {
    setDownloadStatus({ msg: 'Preparando descarga...', type: 'loading' });

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (data.status === 'tunnel' || data.status === 'redirect') {
        const link = document.createElement('a');
        link.href = data.url;
        link.download = `${title}.mp3`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadStatus({ msg: 'Descarga iniciada!', type: 'success' });
        setTimeout(() => setDownloadStatus(null), 2000);
        return;
      }
    } catch {
      // API failed, fall through to fallback
    }

    // Fallback: open cobalt.tools in a new tab
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(`https://cobalt.tools/#url=${encodeURIComponent(ytUrl)}`, '_blank');
    setDownloadStatus({ msg: 'Abriendo cobalt.tools...', type: 'loading' });
    setTimeout(() => setDownloadStatus(null), 2500);
  };

  return { downloadStatus, handleDownload };
}
