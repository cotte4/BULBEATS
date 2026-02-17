import { useState } from 'react';

interface DownloadStatus {
  msg: string;
  type: 'loading' | 'error';
}

export function useDownload() {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);

  const handleDownload = async (videoId: string, title: string) => {
    setDownloadStatus({ msg: 'Preparando descarga...', type: 'loading' });

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (data.status === 'tunnel' || data.status === 'redirect') {
        const link = document.createElement('a');
        link.href = data.url;
        link.download = `${title}.mp3`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadStatus(null);
      } else {
        setDownloadStatus({ msg: data.error || 'Error al descargar', type: 'error' });
        setTimeout(() => setDownloadStatus(null), 3000);
      }
    } catch {
      setDownloadStatus({ msg: 'Error de conexion', type: 'error' });
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  return { downloadStatus, handleDownload };
}
