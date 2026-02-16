import { Flame, Skull, Zap, Search } from 'lucide-react';
import { GENRES } from '../types/genres';
import { useState } from 'react';

interface GenreSelectProps {
  onSelectGenre: (searchTerm: string) => void;
}

export function GenreSelect({ onSelectGenre }: GenreSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      onSelectGenre(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blood/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-hot-pink/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
      </div>

      {/* Logo Section */}
      <div className="text-center mb-10 relative z-10">
        {/* Animated flames */}
        <div className="flex justify-center gap-2 mb-4">
          <span className="text-4xl fire-emoji">🔥</span>
          <span className="text-4xl fire-emoji" style={{ animationDelay: '0.1s' }}>🔥</span>
          <span className="text-4xl fire-emoji" style={{ animationDelay: '0.2s' }}>🔥</span>
        </div>

        {/* Main Logo */}
        <h1 className="diablo-logo text-5xl md:text-6xl mb-2 glitch-text">
          SWIPE BEATS
        </h1>

        {/* Subtitle with skull */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <Skull className="w-5 h-5 text-blood" />
          <p className="text-gray-400 uppercase tracking-[0.3em] text-sm">
            Elige tu estilo
          </p>
          <Skull className="w-5 h-5 text-blood" />
        </div>

        {/* Warning tape decoration */}
        <div className="mt-6 h-2 w-64 mx-auto warning-stripes opacity-60" />
      </div>

      {/* Custom Search Bar */}
      <div className="w-full max-w-md mb-8 relative z-10">
        <div className="relative flex items-center"
             style={{ transform: 'skewX(-3deg)' }}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blood/60 pointer-events-none"
                    style={{ transform: 'skewX(3deg)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Busca cualquier beat..."
              className="w-full pl-12 pr-4 py-3.5 bg-surface border-2 border-blood/40
                         text-white text-sm uppercase tracking-wider font-bold
                         placeholder:text-gray-600 placeholder:normal-case placeholder:tracking-normal
                         focus:outline-none focus:border-blood focus:glow-red
                         transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-5 py-3.5 bg-blood/80 border-2 border-blood text-white font-bold
                       uppercase tracking-wider text-sm hover:bg-blood transition-all
                       hover:glow-red shrink-0"
          >
            <span style={{ transform: 'skewX(3deg)' }} className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-white" />
              Buscar
            </span>
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-2 text-center tracking-wide"
           style={{ transform: 'skewX(0deg)' }}>
          Ej: "Metro Boomin type beat", "dark trap 140 bpm"
        </p>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
        {GENRES.map((genre, index) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.searchTerm)}
            className="genre-card group relative flex flex-col items-center justify-center p-6
                       rounded-none clip-path-none
                       hover:border-blood transition-all duration-300
                       active:scale-95"
            style={{
              animationDelay: `${index * 0.05}s`,
              clipPath: index % 2 === 0
                ? 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)'
                : 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)'
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          bg-gradient-to-t from-blood/20 to-transparent" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blood/50
                          group-hover:border-neon transition-colors" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blood/50
                          group-hover:border-neon transition-colors" />

            {/* Emoji with effects */}
            <span className="text-5xl mb-3 relative z-10 group-hover:scale-110
                           transition-transform duration-300 drop-shadow-lg
                           group-hover:drop-shadow-[0_0_15px_rgba(255,0,51,0.8)]">
              {genre.emoji}
            </span>

            {/* Genre name */}
            <span className="text-white font-bold uppercase tracking-wider text-lg relative z-10
                          group-hover:text-blood transition-colors">
              {genre.label}
            </span>

            {/* Subtle flash on hover */}
            <Zap className="absolute top-2 right-2 w-4 h-4 text-neon opacity-0
                          group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-10 flex items-center gap-4 text-gray-600 relative z-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-blood/50" />
        <Flame className="w-5 h-5 text-blood flame-effect" />
        <span className="text-xs uppercase tracking-widest">Modo Diablo</span>
        <Flame className="w-5 h-5 text-blood flame-effect" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-blood/50" />
      </div>

      {/* Credits */}
      <p className="mt-6 text-gray-700 text-xs uppercase tracking-widest relative z-10">
        🎤 Swipea beats • Guarda fuego • Crea barras 🎤
      </p>
    </div>
  );
}
