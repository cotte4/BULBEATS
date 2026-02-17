import { useState } from 'react';

interface DownloadStatus {
  msg: string;
  type: 'loading' | 'success' | 'error';
}

export function useDownload() {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);

  const handleDownload = async (videoId: string, title: string) => {
    setDownloadStatus({ msg: 'Obteniendo audio...', type: 'loading' });

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (data.url) {
        const link = document.createElement('a');
        link.href = data.url;
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

      setDownloadStatus({
        msg: data.error || 'Error al obtener audio',
        type: 'error',
      });
      setTimeout(() => setDownloadStatus(null), 3500);
    } catch {
      setDownloadStatus({ msg: 'Error de conexion', type: 'error' });
      setTimeout(() => setDownloadStatus(null), 3500);
    }
  };

  return { downloadStatus, handleDownload };
}
