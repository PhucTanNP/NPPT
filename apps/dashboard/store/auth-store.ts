import { create } from "zustand";
import { apiClient } from "@api/index";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const response: any = await apiClient.post("/auth/login", {
      email,
      password,
    });
    const { access_token, user } = response.data;
    apiClient.setToken(access_token);
    set({ token: access_token, user, isAuthenticated: true });
  },

  logout: () => {
    apiClient.setToken(null);
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser: (user: any) => {
    set({ user });
  },
}));
