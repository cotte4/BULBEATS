import { useState } from 'react';

interface DownloadStatus {
  msg: string;
  type: 'loading' | 'success' | 'error';
}

export function useDownload() {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);

  const handleDownload = async (videoId: string, _title: string) => {
    setDownloadStatus({ msg: 'Obteniendo audio...', type: 'loading' });

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await res.json();

      if (data.url) {
        // Open in new tab - browsers handle the audio stream download
        window.open(data.url, '_blank');
        setDownloadStatus({ msg: 'Descarga iniciada!', type: 'success' });
        setTimeout(() => setDownloadStatus(null), 2500);
        return;
      }

      setDownloadStatus({
        msg: data.error || 'Error al obtener audio',
        type: 'error',
      });
      setTimeout(() => setDownloadStatus(null), 4000);
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError';
      setDownloadStatus({
        msg: isAbort ? 'Tiempo agotado. Intenta de nuevo.' : 'Error de conexion',
        type: 'error',
      });
      setTimeout(() => setDownloadStatus(null), 4000);
    }
  };

  return { downloadStatus, handleDownload };
}
