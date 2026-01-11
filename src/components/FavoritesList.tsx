import { Heart, Play, Trash2, Skull, Flame, Zap } from 'lucide-react';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { useState } from 'react';

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
        {/* Background effect */}
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
            <span className="text-blood">←</span>
            Swipea a la derecha para guardar beats
            <span className="text-neon">→</span>
          </p>

          <div className="mt-8 flex gap-2 justify-center">
            <span className="text-2xl">💀</span>
            <span className="text-2xl fire-emoji">🔥</span>
            <span className="text-2xl">💀</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto px-4 py-4 relative">
      {/* Background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blood/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-hot-pink/5 rounded-full blur-3xl" />
      </div>

      {/* Header stats */}
      <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
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

      <div className="space-y-4 max-w-2xl mx-auto relative z-10">
        {favorites.map((beat, index) => (
          <div
            key={beat.videoId}
            className="group relative bg-surface border-2 border-blood/30 overflow-hidden
                       hover:border-blood transition-all duration-300 hover:glow-red"
            style={{
              clipPath: index % 2 === 0
                ? 'polygon(0 0, 100% 0, 100% 100%, 2% 100%)'
                : 'polygon(0 0, 98% 0, 100% 100%, 0 100%)'
            }}
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
                {/* Playing indicator */}
                <div className="absolute top-2 right-2 px-3 py-1 bg-neon/90 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-black" />
                  Playing
                </div>
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
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center
                                opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="w-20 h-20 border-4 border-neon/50 flex items-center justify-center
                                  group-hover/thumb:border-neon transition-colors"
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <Play className="w-10 h-10 text-neon fill-neon ml-1" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-xl bg-neon/30 -z-10" />
                  </div>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
              </div>
            )}

            {/* Beat info */}
            <div className="p-4 flex items-start justify-between gap-3 relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,0,51,0.1) 5px, rgba(255,0,51,0.1) 10px)'
                }} />
              </div>

              <div className="flex-1 min-w-0 relative z-10">
                {/* Metadata badges */}
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
                </div>

                <h3 className="font-bold text-white line-clamp-2 mb-1 uppercase tracking-wide text-sm">
                  {beat.title}
                </h3>
                <p className="text-gray-500 text-xs truncate flex items-center gap-1">
                  <span className="text-blood">🎤</span>
                  {beat.channelTitle}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => removeFavorite(beat.videoId)}
                className="group/del p-3 bg-blood/10 border border-blood/30
                           hover:bg-blood/30 hover:border-blood
                           transition-all shrink-0 relative overflow-hidden"
                style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
              >
                <Trash2 className="w-5 h-5 text-blood group-hover/del:scale-110 transition-transform relative z-10" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-blood/20 opacity-0 group-hover/del:opacity-100 transition-opacity blur-sm" />
              </button>
            </div>

            {/* Bottom accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-blood via-hot-pink to-neon opacity-50
                           group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 flex items-center justify-center gap-4 text-gray-700 relative z-10">
        <Skull className="w-4 h-4 text-blood/50" />
        <span className="text-xs uppercase tracking-widest">Tu coleccion de fuego</span>
        <Skull className="w-4 h-4 text-blood/50" />
      </div>
    </div>
  );
}
