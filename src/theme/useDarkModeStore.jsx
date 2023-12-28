import { create } from 'zustand';
import localStorageService from '../services/localStorageService';

const TOKEN_NAME = 'DARK_MODE';
export const useDarkModeStore = create((set) => ({
    darkMode: localStorageService.get(TOKEN_NAME) ?? false,
    toggleDarkMode: () => set((store) => {
        localStorageService.set(TOKEN_NAME, !store.darkMode);
        return ({ darkMode: !store.darkMode })
    })
}))