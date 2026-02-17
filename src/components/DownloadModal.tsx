import { X, Download, Skull } from 'lucide-react';

interface DownloadModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export function DownloadModal({ videoId, title, onClose }: DownloadModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border-2 border-blood/50 w-full max-w-md overflow-hidden">
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
            className="p-1.5 text-gray-400 hover:text-white hover:bg-blood/20
                       transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-gray-400 text-xs truncate">{title}</p>
        </div>

        {/* Download iframe */}
        <div className="px-4 pb-2 flex justify-center">
          <iframe
            src={`https://yt-mp3s.me/button/mp3/${videoId}?bg=39ff14`}
            width="100%"
            height="57"
            scrolling="no"
            style={{ border: 'none', overflow: 'hidden', minWidth: '200px', maxWidth: '350px' }}
            title="Download MP3"
          />
        </div>

        {/* Hint */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] uppercase tracking-wider">
            <Skull className="w-3 h-3" />
            <span>Haz click en el boton de arriba para descargar</span>
            <Skull className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
