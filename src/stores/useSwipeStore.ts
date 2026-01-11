import { create } from 'zustand';
import type { Beat } from '../types/beat';
import { searchBeats } from '../lib/youtube';

interface SwipeStore {
  genre: string | null;
  beats: Beat[];
  currentIndex: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  nextPageToken: string | null;

  setGenre: (genre: string) => Promise<void>;
  loadMore: () => Promise<void>;
  nextBeat: () => void;
  getCurrentBeat: () => Beat | null;
  reset: () => void;
  hasMoreBeats: () => boolean;
  canLoadMore: () => boolean;
}

export const useSwipeStore = create<SwipeStore>((set, get) => ({
  genre: null,
  beats: [],
  currentIndex: 0,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  nextPageToken: null,

  setGenre: async (genre: string) => {
    set({ genre, isLoading: true, error: null, currentIndex: 0, beats: [], nextPageToken: null });

    try {
      const result = await searchBeats(genre);
      set({ beats: result.beats, nextPageToken: result.nextPageToken || null, isLoading: false });
    } catch {
      set({ error: 'No pudimos cargar beats. Intenta de nuevo.', isLoading: false });
    }
  },

  loadMore: async () => {
    const { genre, nextPageToken, beats, isLoadingMore } = get();
    if (!genre || !nextPageToken || isLoadingMore) return;

    set({ isLoadingMore: true });

    try {
      const result = await searchBeats(genre, nextPageToken);
      // Filter out duplicates
      const existingIds = new Set(beats.map(b => b.videoId));
      const newBeats = result.beats.filter(b => !existingIds.has(b.videoId));

      set({
        beats: [...beats, ...newBeats],
        nextPageToken: result.nextPageToken || null,
        isLoadingMore: false,
      });
    } catch {
      set({ isLoadingMore: false });
    }
  },

  nextBeat: () => {
    const { currentIndex, beats } = get();
    if (currentIndex < beats.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  getCurrentBeat: () => {
    const { beats, currentIndex } = get();
    return beats[currentIndex] || null;
  },

  hasMoreBeats: () => {
    const { beats, currentIndex } = get();
    return currentIndex < beats.length - 1;
  },

  canLoadMore: () => {
    return get().nextPageToken !== null;
  },

  reset: () => {
    set({ genre: null, beats: [], currentIndex: 0, isLoading: false, isLoadingMore: false, error: null, nextPageToken: null });
  },
}));
