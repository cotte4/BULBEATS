import { useState, useRef } from 'react';
import { Skull, Flame, Zap } from 'lucide-react';
import type { Beat } from '../types/beat';

interface SwipeCardProps {
  beat: Beat;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({ beat, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState<'left' | 'right' | null>(null);
  const startX = useRef(0);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX.current;
    setDragX(diff);
  };

  const SWIPE_THRESHOLD = 75;

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragX > SWIPE_THRESHOLD) {
      setIsExiting('right');
      setTimeout(() => {
        onSwipeRight();
        setDragX(0);
        setIsExiting(null);
      }, 300);
    } else if (dragX < -SWIPE_THRESHOLD) {
      setIsExiting('left');
      setTimeout(() => {
        onSwipeLeft();
        setDragX(0);
        setIsExiting(null);
      }, 300);
    } else {
      setDragX(0);
    }
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const rotation = dragX * 0.05;
  const opacity = Math.max(0, 1 - Math.abs(dragX) / 400);

  const getExitTransform = () => {
    if (isExiting === 'left') return 'translateX(-150%) rotate(-30deg)';
    if (isExiting === 'right') return 'translateX(150%) rotate(30deg)';
    return `translateX(${dragX}px) rotate(${rotation}deg)`;
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto overflow-visible"
      style={{
        transform: getExitTransform(),
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        opacity: isExiting ? 0 : opacity,
      }}
    >
      {/* Card container with trashy border */}
      <div className="relative bg-surface border-4 border-blood/50 shadow-2xl overflow-hidden"
           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' }}>
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-blood
                       border-l-[40px] border-l-transparent z-10" />
        <Flame className="absolute top-1 right-1 w-4 h-4 text-white z-20" />

        {/* SKIP indicator — lower threshold (no -0.3 offset) */}
        <div
          className="absolute top-8 left-4 z-20 px-5 py-2 bg-black/90
                     text-blood font-bold text-2xl uppercase tracking-wider
                     transform -rotate-12 border-4 border-blood pointer-events-none
                     flex items-center gap-2"
          style={{
            opacity: Math.max(0, -dragX / 100),
            boxShadow: '0 0 20px rgba(255, 0, 51, 0.5)',
          }}
        >
          <Skull className="w-6 h-6" />
          SKIP
        </div>

        {/* SAVE indicator — lower threshold (no -0.3 offset) */}
        <div
          className="absolute top-8 right-4 z-20 px-5 py-2 bg-black/90
                     text-neon font-bold text-2xl uppercase tracking-wider
                     transform rotate-12 border-4 border-neon pointer-events-none
                     flex items-center gap-2"
          style={{
            opacity: Math.max(0, dragX / 100),
            boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
          }}
        >
          SAVE
          <Zap className="w-6 h-6 fill-neon" />
        </div>

        {/* YouTube Player */}
        <div className="relative aspect-video bg-black">
          {/* Top gradient overlay for visual effect */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

          <iframe
            src={`https://www.youtube.com/embed/${beat.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={beat.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
        </div>

        {/* Beat Info - SWIPE ZONE */}
        <div
          className="p-5 cursor-grab active:cursor-grabbing select-none bg-surface relative"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,51,0.1) 10px, rgba(255,0,51,0.1) 20px)'
            }} />
          </div>

          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2 mb-3 relative z-10">
            {beat.bpm && (
              <span className="px-3 py-1.5 bg-blood/20 text-blood text-sm font-bold
                             border border-blood/50 uppercase tracking-wider
                             flex items-center gap-1">
                <span className="text-neon">⚡</span>
                {beat.bpm} BPM
              </span>
            )}
            {beat.typeBeat && (
              <span className="px-3 py-1.5 bg-hot-pink/20 text-hot-pink text-sm font-bold
                             border border-hot-pink/50 uppercase tracking-wider">
                {beat.typeBeat} Type
              </span>
            )}
          </div>

          {/* Swipe hint with idle labels */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-blood/40 text-xs uppercase tracking-widest font-bold swipe-hint-pulse">
              ← SKIP
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="text-blood">←</span>
              Swipea aqui
              <span className="text-neon">→</span>
            </p>
            <span className="text-neon/40 text-xs uppercase tracking-widest font-bold swipe-hint-pulse">
              SAVE →
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-white line-clamp-2 mb-1 uppercase tracking-wide relative z-10">
            {beat.title}
          </h2>

          {/* Channel */}
          <p className="text-gray-400 text-sm truncate flex items-center gap-2 relative z-10">
            <span className="text-blood">🎤</span>
            {beat.channelTitle}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-blood via-hot-pink to-neon" />
      </div>

      {/* Glow effect based on drag direction */}
      <div
        className="absolute inset-0 pointer-events-none rounded-none transition-opacity duration-200"
        style={{
          boxShadow: dragX > 50
            ? '0 0 40px rgba(57, 255, 20, 0.4), 0 0 80px rgba(57, 255, 20, 0.2)'
            : dragX < -50
              ? '0 0 40px rgba(255, 0, 51, 0.4), 0 0 80px rgba(255, 0, 51, 0.2)'
              : 'none',
        }}
      />
    </div>
  );
}
