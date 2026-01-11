import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Beat } from '../types/beat';

interface FavoritesStore {
  favorites: Beat[];
  addFavorite: (beat: Beat) => void;
  removeFavorite: (videoId: string) => void;
  isFavorite: (videoId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (beat: Beat) => {
        const { favorites } = get();
        if (favorites.length >= 100) {
          return;
        }
        if (!get().isFavorite(beat.videoId)) {
          set({
            favorites: [{ ...beat, savedAt: new Date() }, ...favorites],
          });
        }
      },

      removeFavorite: (videoId: string) => {
        set({
          favorites: get().favorites.filter((b) => b.videoId !== videoId),
        });
      },

      isFavorite: (videoId: string) => {
        return get().favorites.some((b) => b.videoId === videoId);
      },
    }),
    {
      name: 'beatfinder-favorites',
    }
  )
);
