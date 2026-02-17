import { useState, useCallback } from 'react';

interface DownloadModal {
  videoId: string;
  title: string;
}

export function useDownload() {
  const [downloadModal, setDownloadModal] = useState<DownloadModal | null>(null);

  const handleDownload = useCallback((videoId: string, title: string) => {
    setDownloadModal({ videoId, title });
  }, []);

  const closeDownload = useCallback(() => {
    setDownloadModal(null);
  }, []);

  return { downloadModal, handleDownload, closeDownload };
}
