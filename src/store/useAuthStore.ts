import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

/* Persisted to localStorage so a refresh doesn't drop the session.
   Swap the storage/backing call for a real auth API when the
   backend (API Gateway + Cognito, per the SOW §4.1) is wired up. */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'blacksmith-auth' }
  )
);
