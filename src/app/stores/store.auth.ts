import { PartialUser } from '@/utils';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  user: PartialUser | null;
  setUser: (user: PartialUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  clearUser: () => set({ user: null }),
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));
