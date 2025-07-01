import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface LightDarkModeState {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

// persist data for caching - ensures data not lost on close / refresh browser
export const useLightDarkModeState = create<LightDarkModeState>() (
	persist(
		(set, get) => ({
			isDarkMode: false,
			toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode}),
		}),
		{
			name: "light-dark-mode",
		}
	)
);
