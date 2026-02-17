import { Heart, Play, Square, Trash2, Skull, ExternalLink, Grid, List, User, Download } from 'lucide-react';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { useState, useMemo } from 'react';
import { useDownload } from '../hooks/useDownload';
import { DownloadModal } from './DownloadModal';

type SortBy = 'recent' | 'bpm' | 'channel';

function formatRelativeTime(date: Date | string | undefined): string {
  if (!date) return '';
  const now = new Date();
  const saved = new Date(date);
  const diffMs = now.getTime() - saved.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'ahora mismo';
  if (diffMins < 60) return `hace ${diffMins} min`;
  if (diffHours < 24) return `hace ${diffHours}h`;
  if (diffDays < 30) return `hace ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  return `hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
}

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { downloadModal, handleDownload, closeDownload } = useDownload();

  const channels = useMemo(() => {
    const set = new Set(favorites.map(b => b.channelTitle));
    return Array.from(set).sort();
  }, [favorites]);

  const displayBeats = useMemo(() => {
    let list = [...favorites];
    if (filterChannel !== 'all') {
      list = list.filter(b => b.channelTitle === filterChannel);
    }
    switch (sortBy) {
      case 'bpm':
        list.sort((a, b) => (b.bpm || 0) - (a.bpm || 0));
        break;
      case 'channel':
        list.sort((a, b) => a.channelTitle.localeCompare(b.channelTitle));
        break;
      case 'recent':
      default:
        break;
    }
    return list;
  }, [favorites, sortBy, filterChannel]);

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blood/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-hot-pink/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="relative mb-6">
            <Heart className="w-20 h-20 text-blood/30" />
            <Skull className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blood" />
          </div>
          <p className="text-gray-400 text-xl mb-3 uppercase tracking-widest">
            Aun no tienes favoritos
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-2 justify-center">
            <span className="text-blood">&larr;</span>
            Swipea a la derecha para guardar beats
            <span className="text-neon">&rarr;</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto px-4 py-4 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blood/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-hot-pink/5 rounded-full blur-3xl" />
      </div>

      {/* Header stats */}
      <div className="flex items-center justify-center gap-4 mb-4 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blood/30" />
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-blood/30">
          <Flame className="w-4 h-4 text-blood flame-effect" />
          <span className="text-white font-bold uppercase tracking-wider">
            {favorites.length} {favorites.length === 1 ? 'Beat' : 'Beats'}
          </span>
          <span className="text-neon">Guardados</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blood/30" />
      </div>

      {/* Sort / Filter / View Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative z-10">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="px-3 py-2 bg-surface border-2 border-blood/40 text-white text-xs
                     uppercase tracking-wider font-bold
                     focus:outline-none focus:border-blood cursor-pointer
                     hover:glow-red transition-all"
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          <option value="recent" className="bg-surface">Reciente</option>
          <option value="bpm" className="bg-surface">BPM ↓</option>
          <option value="channel" className="bg-surface">Canal A→Z</option>
        </select>

        {channels.length > 1 && (
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-neon" />
            <select
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="px-3 py-2 bg-surface border-2 border-blood/40 text-white text-xs
                         uppercase tracking-wider font-bold max-w-[180px]
                         focus:outline-none focus:border-blood cursor-pointer
                         hover:glow-red transition-all"
              style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
            >
              <option value="all" className="bg-surface">Todos ({favorites.length})</option>
              {channels.map((ch) => {
                const count = favorites.filter(b => b.channelTitle === ch).length;
                return (
                  <option key={ch} value={ch} className="bg-surface">
                    {ch.length > 18 ? ch.slice(0, 18) + '...' : ch} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <div className="flex border-2 border-blood/40">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-all ${viewMode === 'list' ? 'bg-blood/30 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-blood/30 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto relative z-10">
          {displayBeats.map((beat) => (
            <div
              key={beat.videoId}
              className="group relative bg-surface border-2 border-blood/30 overflow-hidden
                         hover:border-blood transition-all duration-300"
            >
              {playingId === beat.videoId ? (
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${beat.videoId}?autoplay=1&rel=0`}
                    title={beat.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute top-1 right-1 p-1 bg-blood/90 text-white border border-blood"
                  >
                    <Square className="w-3 h-3 fill-white" />
                  </button>
                </div>
              ) : (
                <div
                  className="relative aspect-video cursor-pointer"
                  onClick={() => setPlayingId(beat.videoId)}
                >
                  <img src={beat.thumbnail} alt={beat.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center
                                  opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-neon fill-neon" />
                  </div>
                  {beat.bpm && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-blood text-[10px] font-bold border border-blood/30">
                      {beat.bpm} BPM
                    </span>
                  )}
                </div>
              )}
              <div className="p-2">
                <h3 className="text-white text-xs font-bold line-clamp-1 uppercase tracking-wide">
                  {beat.title}
                </h3>
                <p className="text-gray-500 text-[10px] truncate">{beat.channelTitle}</p>
              </div>
              {/* Grid action bar */}
              <div className="flex border-t border-blood/20">
                <button
                  onClick={() => handleDownload(beat.videoId, beat.title)}
                  className="flex-1 flex items-center justify-center gap-1 py-2
                             text-neon hover:bg-neon/10 transition-all text-[10px] uppercase tracking-wider font-bold"
                >
                  <Download className="w-3 h-3" />
                  MP3
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${beat.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-2
                             text-gray-400 hover:bg-white/5 transition-all text-[10px] uppercase tracking-wider font-bold
                             border-x border-blood/20"
                >
                  <ExternalLink className="w-3 h-3" />
                  YT
                </a>
                <button
                  onClick={() => removeFavorite(beat.videoId)}
                  className="flex-1 flex items-center justify-center gap-1 py-2
                             text-blood hover:bg-blood/10 transition-all text-[10px] uppercase tracking-wider font-bold"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4 max-w-3xl mx-auto relative z-10">
          {displayBeats.map((beat, index) => (
            <div
              key={beat.videoId}
              className="group relative bg-surface border-2 border-blood/30 overflow-hidden
                         hover:border-blood transition-all duration-300 hover:glow-red"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-blood/20 flex items-center justify-center z-10">
                <span className="text-blood font-bold text-xs">#{index + 1}</span>
              </div>

              {playingId === beat.videoId ? (
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${beat.videoId}?autoplay=1&rel=0`}
                    title={beat.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute top-2 right-2 px-3 py-1 bg-blood/90 text-white text-xs font-bold
                               uppercase tracking-wider flex items-center gap-1 hover:bg-blood transition-colors
                               border border-blood"
                  >
                    <Square className="w-3 h-3 fill-white" />
                    Stop
                  </button>
                </div>
              ) : (
                <div
                  className="relative aspect-video cursor-pointer group/thumb"
                  onClick={() => setPlayingId(beat.videoId)}
                >
                  <img
                    src={beat.thumbnail}
                    alt={beat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center
                                  opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-neon/50 flex items-center justify-center
                                    group-hover/thumb:border-neon transition-colors"
                           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <Play className="w-10 h-10 text-neon fill-neon ml-1" />
                      </div>
                      <div className="absolute inset-0 blur-xl bg-neon/30 -z-10" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
                </div>
              )}

              {/* Beat info */}
              <div className="p-4 relative">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {beat.bpm && (
                      <span className="px-2 py-0.5 bg-blood/20 text-blood text-xs font-bold
                                     border border-blood/30 uppercase tracking-wider">
                        ⚡ {beat.bpm} BPM
                      </span>
                    )}
                    {beat.typeBeat && (
                      <span className="px-2 py-0.5 bg-hot-pink/20 text-hot-pink text-xs font-bold
                                     border border-hot-pink/30 uppercase tracking-wider">
                        {beat.typeBeat}
                      </span>
                    )}
                    {beat.savedAt && (
                      <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs
                                     border border-gray-700 tracking-wider">
                        {formatRelativeTime(beat.savedAt)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white line-clamp-2 mb-1 uppercase tracking-wide text-sm">
                    {beat.title}
                  </h3>
                  <p className="text-gray-500 text-xs truncate flex items-center gap-1">
                    <span className="text-blood">🎤</span>
                    {beat.channelTitle}
                  </p>
                </div>
              </div>

              {/* ACTION BAR — clear, labeled, easy to click */}
              <div className="flex border-t border-blood/30">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownload(beat.videoId, beat.title); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3
                             text-neon hover:bg-neon/10 active:bg-neon/20
                             transition-all text-xs uppercase tracking-wider font-bold"
                >
                  <Download className="w-4 h-4" />
                  Descargar MP3
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${beat.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 py-3
                             text-gray-400 hover:text-white hover:bg-white/5
                             transition-all text-xs uppercase tracking-wider font-bold
                             border-x border-blood/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube
                </a>
                <button
                  onClick={() => removeFavorite(beat.videoId)}
                  className="flex-1 flex items-center justify-center gap-2 py-3
                             text-blood hover:bg-blood/10 active:bg-blood/20
                             transition-all text-xs uppercase tracking-wider font-bold"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-blood via-hot-pink to-neon opacity-50
                             group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {/* Filtered empty state */}
      {displayBeats.length === 0 && favorites.length > 0 && (
        <div className="text-center py-12 relative z-10">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">No hay beats de este canal</p>
          <button
            onClick={() => setFilterChannel('all')}
            className="text-neon text-xs uppercase tracking-wider hover:underline"
          >
            Ver todos
          </button>
        </div>
      )}

      {/* Bottom decoration */}
      <div className="mt-8 flex items-center justify-center gap-4 text-gray-700 relative z-10">
        <Skull className="w-4 h-4 text-blood/50" />
        <span className="text-xs uppercase tracking-widest">Tu coleccion de fuego</span>
        <Skull className="w-4 h-4 text-blood/50" />
      </div>

      {/* Download modal */}
      {downloadModal && (
        <DownloadModal
          videoId={downloadModal.videoId}
          title={downloadModal.title}
          onClose={closeDownload}
        />
      )}
    </div>
  );
}
