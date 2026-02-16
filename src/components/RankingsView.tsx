import { useEffect, useState } from 'react';
import { Flame, ThumbsUp, ThumbsDown, Skull, ExternalLink } from 'lucide-react';
import { getRankedBeats } from '../lib/firestore';
import type { RankedBeat } from '../types/beat';

export function RankingsView() {
  const [beats, setBeats] = useState<RankedBeat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getRankedBeats(50)
      .then((data) => {
        if (!cancelled) setBeats(data);
      })
      .catch(() => {
        if (!cancelled) setError('Error cargando rankings');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative">
          <div
            className="w-20 h-20 border-4 border-blood/30 border-t-blood animate-spin"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
          <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blood flame-effect" />
        </div>
        <p className="text-gray-400 mt-6 uppercase tracking-widest text-sm">
          Cargando rankings...
        </p>
        <div className="flex gap-1 mt-3">
          <span className="fire-emoji">🔥</span>
          <span className="fire-emoji" style={{ animationDelay: '0.1s' }}>🔥</span>
          <span className="fire-emoji" style={{ animationDelay: '0.2s' }}>🔥</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <Skull className="w-16 h-16 text-blood mb-4" />
        <p className="text-blood text-lg uppercase tracking-wider">{error}</p>
      </div>
    );
  }

  if (beats.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <Skull className="w-16 h-16 text-gray-600 mb-4" />
        <p className="text-gray-400 text-xl uppercase tracking-widest mb-2">
          No hay votos todavia
        </p>
        <p className="text-gray-600 text-sm">
          Haz swipe para que aparezcan beats aqui!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-gray-500 text-xs uppercase tracking-widest">
          Top beats de la comunidad
        </p>
      </div>

      {/* Rankings list */}
      <div className="max-w-2xl mx-auto space-y-3">
        {beats.map((beat, i) => {
          const totalVotes = beat.likes + beat.dislikes;
          const likePercent = totalVotes > 0 ? (beat.likes / totalVotes) * 100 : 50;

          return (
            <div
              key={beat.videoId}
              className="relative bg-surface border-2 border-blood/20 hover:border-blood/50
                         transition-all duration-300 overflow-hidden group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Rank number */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  {i < 3 ? (
                    <span className={`text-2xl font-bold ${
                      i === 0 ? 'text-gold text-glow-gold' :
                      i === 1 ? 'text-gray-300' :
                      'text-amber-600'
                    }`}>
                      {i === 0 ? '🔥' : i === 1 ? '⚡' : '💀'}
                    </span>
                  ) : (
                    <span className="text-gray-500 font-bold text-lg">
                      {i + 1}
                    </span>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-16 h-12 overflow-hidden bg-black/50"
                     style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}>
                  <img
                    src={beat.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold truncate leading-tight">
                    {beat.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-500 text-xs truncate">
                      {beat.channelTitle}
                    </span>
                    {beat.bpm && (
                      <span className="text-blood text-xs font-bold">
                        {beat.bpm} BPM
                      </span>
                    )}
                  </div>

                  {/* Vote bar */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <ThumbsUp className="w-3 h-3 text-neon flex-shrink-0" />
                    <div className="flex-1 h-1.5 bg-blood/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon to-neon/50 transition-all"
                        style={{ width: `${likePercent}%` }}
                      />
                    </div>
                    <ThumbsDown className="w-3 h-3 text-blood flex-shrink-0" />
                  </div>
                </div>

                {/* Vote count */}
                <div className="flex-shrink-0 text-right">
                  <div className={`text-lg font-bold ${
                    beat.netVotes > 0 ? 'text-neon' :
                    beat.netVotes < 0 ? 'text-blood' :
                    'text-gray-500'
                  }`}>
                    {beat.netVotes > 0 ? '+' : ''}{beat.netVotes}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {totalVotes} votos
                  </div>
                </div>

                {/* YouTube link */}
                <a
                  href={`https://www.youtube.com/watch?v=${beat.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
                             text-blood hover:text-white p-1"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
