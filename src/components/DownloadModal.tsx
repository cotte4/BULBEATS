import { useState, useEffect, useCallback } from 'react';
import { X, Download, Copy, Check, ExternalLink, Skull, HardDrive, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface DownloadModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

const LOCAL_SERVER = 'http://localhost:3001';

type LocalStatus = 'checking' | 'online' | 'offline';
type DownloadState = 'idle' | 'downloading' | 'done' | 'error';

const CONVERTERS = [
  {
    name: 'ssyoutube',
    label: 'Abrir en SSYoutube',
    getUrl: (id: string) => `https://ssyoutube.com/watch?v=${id}`,
    description: 'Se abre con el video listo',
  },
  {
    name: 'cnvmp3',
    label: 'Abrir CnvMP3',
    getUrl: () => 'https://cnvmp3.com',
    description: 'Ad-free · Pega la URL copiada',
  },
];

export function DownloadModal({ videoId, title, onClose }: DownloadModalProps) {
  const [copied, setCopied] = useState(false);
  const [localStatus, setLocalStatus] = useState<LocalStatus>('checking');
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const [downloadMsg, setDownloadMsg] = useState('');
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Check if local server is running
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${LOCAL_SERVER}/health`, { signal: controller.signal })
      .then((r) => r.json())
      .then(() => setLocalStatus('online'))
      .catch(() => setLocalStatus('offline'));
    return () => controller.abort();
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(youtubeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = youtubeUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const openConverter = (getUrl: (id: string) => string) => {
    copyUrl();
    window.open(getUrl(videoId), '_blank', 'noopener');
  };

  const downloadLocal = useCallback(async () => {
    setDownloadState('downloading');
    setDownloadMsg('Descargando con yt-dlp...');
    try {
      const params = new URLSearchParams({ videoId, title });
      const res = await fetch(`${LOCAL_SERVER}/download?${params}`);
      const data = await res.json();
      if (data.success) {
        setDownloadState('done');
        setDownloadMsg(data.message);
      } else {
        setDownloadState('error');
        setDownloadMsg(data.error || 'Error desconocido');
      }
    } catch {
      setDownloadState('error');
      setDownloadMsg('No se pudo conectar al servidor local');
    }
  }, [videoId, title]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border-2 border-blood/50 w-full max-w-sm overflow-hidden">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-blood via-hot-pink to-neon" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blood/20">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-neon" />
            <span className="text-white font-bold uppercase tracking-wider text-sm">
              Descargar MP3
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-blood/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-gray-400 text-xs truncate">{title}</p>
        </div>

        {/* Local server download (shown first when available) */}
        {localStatus === 'online' && (
          <div className="px-4 pt-3">
            <button
              onClick={downloadLocal}
              disabled={downloadState === 'downloading'}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3.5
                         font-bold text-sm uppercase tracking-wider transition-all
                         ${downloadState === 'done'
                           ? 'bg-neon/20 border-2 border-neon/50 text-neon'
                           : downloadState === 'error'
                             ? 'bg-red-500/20 border-2 border-red-500/50 text-red-400'
                             : downloadState === 'downloading'
                               ? 'bg-neon/10 border-2 border-neon/30 text-neon/70 cursor-wait'
                               : 'bg-neon/20 border-2 border-neon text-neon hover:bg-neon/30'
                         }`}
            >
              {downloadState === 'downloading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Descargando...
                </>
              ) : downloadState === 'done' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Descargado!
                </>
              ) : downloadState === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Error - Reintentar
                </>
              ) : (
                <>
                  <HardDrive className="w-4 h-4" />
                  Descarga Directa (Local)
                </>
              )}
            </button>
            {downloadMsg && (
              <p className={`text-[10px] mt-1.5 text-center ${
                downloadState === 'done' ? 'text-neon/70' :
                downloadState === 'error' ? 'text-red-400/70' :
                'text-gray-500'
              }`}>
                {downloadMsg}
              </p>
            )}
            <div className="border-b border-blood/10 mt-3" />
          </div>
        )}

        {/* Copy URL */}
        <div className="px-4 pt-3">
          <button
            onClick={copyUrl}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3
                       font-bold text-sm uppercase tracking-wider transition-all
                       ${copied
                         ? 'bg-neon/20 border border-neon/50 text-neon'
                         : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                       }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                URL Copiada!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar URL de YouTube
              </>
            )}
          </button>
        </div>

        {/* Online converters (fallback) */}
        <div className="px-4 pt-3 pb-2 space-y-2">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest text-center">
            {localStatus === 'online' ? 'O usar convertidor online' : 'Abrir convertidor'}
          </p>
          {CONVERTERS.map((c) => (
            <button
              key={c.name}
              onClick={() => openConverter(c.getUrl)}
              className="w-full flex items-center justify-between px-4 py-3
                         bg-blood/10 border border-blood/30 hover:bg-blood/20
                         transition-all group"
            >
              <div className="text-left">
                <span className="text-white font-bold text-sm block">
                  {c.label}
                </span>
                <span className="text-gray-500 text-[10px]">
                  {c.description}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-neon transition-colors" />
            </button>
          ))}
        </div>

        {/* Hint */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] uppercase tracking-wider">
            <Skull className="w-3 h-3" />
            <span>
              {localStatus === 'online'
                ? 'Servidor local detectado · Descarga directa'
                : 'La URL se copia automaticamente al abrir'}
            </span>
            <Skull className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
