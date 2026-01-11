import { Heart, ArrowLeft, Flame, Skull } from 'lucide-react';

interface HeaderProps {
  view: 'genres' | 'swipe' | 'favorites';
  onBack: () => void;
  onFavorites: () => void;
  favoritesCount: number;
  genre?: string;
}

export function Header({ view, onBack, onFavorites, favoritesCount, genre }: HeaderProps) {
  const showBackButton = view !== 'genres';
  const title = view === 'favorites' ? 'TUS FAVORITOS' : genre || 'SWIPE BEATS';

  return (
    <header className="sticky top-0 bg-background/90 backdrop-blur-md border-b-2 border-blood/30 z-40">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-blood via-hot-pink to-neon" />

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            {showBackButton ? (
              <button
                onClick={onBack}
                className="group w-12 h-12 flex items-center justify-center
                           bg-surface border-2 border-blood/50 hover:border-blood
                           transition-all duration-300 hover:glow-red
                           transform hover:scale-105 active:scale-95"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
              >
                <ArrowLeft className="w-5 h-5 text-blood group-hover:text-white transition-colors" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-blood flame-effect" />
              </div>
            )}

            {/* Title */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold uppercase tracking-wider text-white
                           text-glow-red">
                {title}
              </h1>
              {view === 'swipe' && (
                <span className="text-neon text-lg">⚡</span>
              )}
            </div>
          </div>

          {/* Right section - Favorites button */}
          {view !== 'favorites' && (
            <button
              onClick={onFavorites}
              className="group relative flex items-center gap-2 px-5 py-2.5
                         bg-gradient-to-r from-blood/20 to-hot-pink/20
                         border-2 border-blood/50 hover:border-blood
                         transition-all duration-300 hover:glow-red
                         transform hover:scale-105 active:scale-95"
              style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
            >
              {/* Animated heart */}
              <Heart className="w-5 h-5 text-blood fill-blood group-hover:scale-110
                             transition-transform" />

              {/* Count badge */}
              {favoritesCount > 0 && (
                <span className="text-white font-bold text-lg min-w-[1.5rem]">
                  {favoritesCount}
                </span>
              )}

              {/* Fire indicator when has favorites */}
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 text-sm fire-emoji">🔥</span>
              )}
            </button>
          )}

          {/* Skull decoration for favorites view */}
          {view === 'favorites' && (
            <Skull className="w-6 h-6 text-blood" />
          )}
        </div>
      </div>

      {/* Bottom scanline effect */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blood/50 to-transparent" />
    </header>
  );
}
