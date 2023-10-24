import { create } from 'zustand'
export const useDarkModeStore = create((set) => ({
    darkMode: false,

    toggleDarkMode: () => set((store) => ({ darkMode: !store.darkMode }))
}))