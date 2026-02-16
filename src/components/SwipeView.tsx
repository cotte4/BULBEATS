import { Loader2, RefreshCw, Plus, Skull, Flame, User } from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { SwipeButtons } from './SwipeButtons';
import { useSwipeStore } from '../stores/useSwipeStore';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { useUserStore } from '../stores/useUserStore';
import { filterBeatsByChannel, getUniqueChannels } from '../lib/youtube';
import { castVote } from '../lib/firestore';
import { useState, useMemo, useEffect, useCallback } from 'react';

export function SwipeView() {
  const {
    beats,
    currentIndex,
    isLoading,
    isLoadingMore,
    error,
    nextBeat,
    genre,
    setGenre,
    reset,
    loadMore,
    canLoadMore,
  } = useSwipeStore();
  const { addFavorite, isFavorite } = useFavoritesStore();
  const { usernameSlug, username } = useUserStore();
  const [selectedChannel, setSelectedChannel] = useState<string>('All Channels');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Get unique channels from loaded beats
  const channels = useMemo(() => {
    return getUniqueChannels(beats);
  }, [beats]);

  // Apply channel filter
  const filteredBeats = useMemo(() => {
    return filterBeatsByChannel(beats, selectedChannel);
  }, [beats, selectedChannel]);

  const currentBeat = filteredBeats[currentIndex] || null;
  const hasMore = currentIndex < filteredBeats.length - 1;

  const handleSkip = useCallback(() => {
    if (currentBeat && usernameSlug && username) {
      castVote(currentBeat, 'dislike', usernameSlug, username).catch(() => {});
    }
    if (hasMore) {
      nextBeat();
    }
  }, [currentBeat, hasMore, nextBeat, usernameSlug, username]);

  const handleSave = useCallback(() => {
    if (currentBeat) {
      addFavorite(currentBeat);
      if (usernameSlug && username) {
        castVote(currentBeat, 'like', usernameSlug, username).catch(() => {});
      }
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 1200);
      if (hasMore) {
        nextBeat();
      }
    }
  }, [currentBeat, hasMore, addFavorite, nextBeat, usernameSlug, username]);

  const handleSwipeLeft = () => {
    handleSkip();
  };

  const handleSwipeRight = () => {
    handleSave();
  };

  const handleRetry = () => {
    if (genre) {
      setGenre(genre);
    }
  };

  const handleLoadMore = async () => {
    await loadMore();
  };

  // Keyboard support: Arrow Left = skip, Arrow Right = save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip, handleSave]);

  // Reset channel filter when it results in no beats
  const handleResetFilter = () => {
    setSelectedChannel('All Channels');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 bg-blood/20 rounded-full blur-3xl" />
        </div>

        {/* Loading spinner with trashy style */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blood/30 border-t-blood animate-spin"
               style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
          <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blood flame-effect" />
        </div>

        <p className="text-gray-400 mt-6 uppercase tracking-widest text-sm">
          Cargando fuego...
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
        <p className="text-blood text-lg mb-6 uppercase tracking-wider">{error}</p>
        <button
          onClick={handleRetry}
          className="trashy-btn flex items-center gap-3 px-8 py-4 text-white font-bold"
        >
          <span className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Reintentar
          </span>
        </button>
      </div>
    );
  }

  if (!currentBeat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
        {/* Background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-hot-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex gap-2 mb-4 justify-center">
            <span className="text-4xl fire-emoji">🔥</span>
            <span className="text-4xl">💀</span>
            <span className="text-4xl fire-emoji">🔥</span>
          </div>

          <p className="text-gray-400 text-xl mb-8 uppercase tracking-widest">
            {selectedChannel !== 'All Channels'
              ? 'No hay mas beats de este canal'
              : 'Se acabaron los beats!'}
          </p>

          <div className="flex flex-col gap-4">
            {selectedChannel !== 'All Channels' && (
              <button
                onClick={handleResetFilter}
                className="flex items-center justify-center gap-3 px-8 py-4
                           bg-neon/20 border-2 border-neon/50 hover:border-neon
                           text-white font-bold uppercase tracking-wider
                           transition-all hover:glow-neon"
                style={{ transform: 'skewX(-5deg)' }}
              >
                <span style={{ transform: 'skewX(5deg)' }} className="flex items-center gap-2">
                  <User className="w-5 h-5 text-neon" />
                  Ver todos los canales
                </span>
              </button>
            )}

            {canLoadMore() && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="trashy-btn flex items-center justify-center gap-3 px-8 py-4
                           text-white font-bold disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  {isLoadingMore ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Cargar mas fuego
                </span>
              </button>
            )}

            <button
              onClick={reset}
              className="flex items-center justify-center gap-3 px-8 py-4
                         bg-surface border-2 border-blood/50 hover:border-blood
                         text-white font-bold uppercase tracking-wider
                         transition-all hover:glow-red"
              style={{ transform: 'skewX(-5deg)' }}
            >
              <span style={{ transform: 'skewX(5deg)' }} className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-blood" />
                Elegir otro genero
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-2 relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blood/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-hot-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Channel Filter */}
      <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
        <User className="w-4 h-4 text-neon" />
        <select
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          className="px-4 py-2 bg-surface border-2 border-blood/50 text-white text-sm
                     uppercase tracking-wider font-bold max-w-[200px]
                     focus:outline-none focus:border-blood cursor-pointer
                     hover:glow-red transition-all"
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          <option value="All Channels" className="bg-surface">
            Todos ({beats.length})
          </option>
          {channels.map((channel) => {
            const count = beats.filter(b => b.channelTitle === channel).length;
            return (
              <option key={channel} value={channel} className="bg-surface">
                {channel.length > 20 ? channel.slice(0, 20) + '...' : channel} ({count})
              </option>
            );
          })}
        </select>
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {channels.length} canales
        </span>
      </div>

      {/* Swipe Card */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <SwipeCard
          key={currentBeat.videoId}
          beat={currentBeat}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </div>

      {/* Swipe Buttons */}
      <SwipeButtons
        onSkip={handleSkip}
        onSave={handleSave}
        isSaved={isFavorite(currentBeat.videoId)}
      />

      {/* Save toast notification */}
      {showSaveToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 save-toast">
          <div className="px-6 py-3 bg-neon/90 text-black font-bold uppercase tracking-wider text-sm
                          flex items-center gap-2 border-2 border-neon glow-neon">
            <Flame className="w-4 h-4" />
            Guardado!
            <Flame className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="text-center pb-4 relative z-10">
        <p className="text-gray-600 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="text-blood">{currentIndex + 1}</span>
          <span>/</span>
          <span className="text-neon">{filteredBeats.length}</span>
          <span className="text-gray-700">beats</span>
          {canLoadMore() && (
            <span className="text-hot-pink ml-2">(hay mas 🔥)</span>
          )}
        </p>

        {/* Progress bar */}
        <div className="mt-2 h-1 w-48 mx-auto bg-surface overflow-hidden"
             style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}>
          <div
            className="h-full bg-gradient-to-r from-blood via-hot-pink to-neon transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredBeats.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
