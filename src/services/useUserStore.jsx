import { create } from 'zustand';
import { API_URL, doApiMethod, TOKEN_NAME } from "./apiService";

export const useUserStore = create((set) => ({
  user: null,

  // Initialize user data from local storage on app start
  init: () => {
    const storedUser = localStorage.getItem(TOKEN_NAME);
    if (storedUser) {
      set(() => ({ user: JSON.parse(storedUser) }));
    }
  },

  signup: async () => {
    const res = await doApiMethod(API_URL + '/signup');
    if (res.ok) {
      const user = res.body;

      // Save user data to local storage
      localStorage.setItem(TOKEN_NAME, JSON.stringify(user));

      set(() => ({ user }));
    }
  },

  logout: () => {
    // Clear user data from local storage
    localStorage.removeItem(TOKEN_NAME);

    set(() => ({ user: null }));
  },
}));
