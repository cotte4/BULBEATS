import { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Skull } from 'lucide-react';

interface DownloadModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

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
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

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

        {/* Step 1: Copy URL */}
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

        {/* Step 2: Open converter */}
        <div className="px-4 pt-3 pb-2 space-y-2">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest text-center">
            Abrir convertidor
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
            <span>La URL se copia automaticamente al abrir</span>
            <Skull className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
