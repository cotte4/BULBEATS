import { Heart, Skull, Flame } from 'lucide-react';

interface SwipeButtonsProps {
  onSkip: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export function SwipeButtons({ onSkip, onSave, isSaved }: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-12 py-6 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px
                     bg-gradient-to-r from-transparent via-blood/30 to-transparent" />

      {/* SKIP Button */}
      <button
        onClick={onSkip}
        className="group relative w-18 h-18 flex items-center justify-center
                   transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-none bg-blood/10 border-4 border-blood/50
                       group-hover:border-blood group-hover:glow-red transition-all"
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

        {/* Inner content */}
        <div className="relative w-16 h-16 flex items-center justify-center bg-black/50">
          <Skull className="w-8 h-8 text-blood group-hover:scale-110 transition-transform" />
        </div>

        {/* Label */}
        <span className="absolute -bottom-6 text-xs text-blood uppercase tracking-widest font-bold
                        opacity-0 group-hover:opacity-100 transition-opacity">
          Skip
        </span>
      </button>

      {/* Center decoration */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl">💀</span>
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">or</span>
        <span className="text-2xl fire-emoji">🔥</span>
      </div>

      {/* SAVE Button */}
      <button
        onClick={onSave}
        className="group relative w-18 h-18 flex items-center justify-center
                   transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-none border-4 transition-all
                        ${isSaved
                          ? 'bg-neon/30 border-neon glow-neon'
                          : 'bg-neon/10 border-neon/50 group-hover:border-neon group-hover:glow-neon'}`}
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

        {/* Inner content */}
        <div className="relative w-16 h-16 flex items-center justify-center bg-black/50">
          {isSaved ? (
            <Flame className="w-8 h-8 text-neon fill-neon group-hover:scale-110 transition-transform flame-effect" />
          ) : (
            <Heart className="w-8 h-8 text-neon group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Label */}
        <span className="absolute -bottom-6 text-xs text-neon uppercase tracking-widest font-bold
                        opacity-0 group-hover:opacity-100 transition-opacity">
          {isSaved ? 'Saved!' : 'Save'}
        </span>

        {/* Fire burst on saved */}
        {isSaved && (
          <span className="absolute -top-2 -right-2 text-lg fire-emoji">🔥</span>
        )}
      </button>
    </div>
  );
}
