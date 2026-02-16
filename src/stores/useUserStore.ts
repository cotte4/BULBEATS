import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string | null;
  usernameSlug: string | null;
  setUser: (username: string) => void;
  clearUser: () => void;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      usernameSlug: null,
      setUser: (username: string) =>
        set({ username, usernameSlug: slugify(username) }),
      clearUser: () => set({ username: null, usernameSlug: null }),
    }),
    { name: 'bulbeats-user' },
  ),
);
