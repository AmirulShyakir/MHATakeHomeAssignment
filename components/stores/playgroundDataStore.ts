import { create } from "zustand";

// In TypeScript, we want to define the shape of our data
interface PlaygroundDataState {
	buttonClickCount: number;
	setButtonClickCount: (numberToAdd: number) => void;
}

// Create the store to store our data. This data can be stored and access from any component within the application
// Other then set, you can define getters to read current local state for computation before setting as well
export const usePlaygroundDataStore = create<PlaygroundDataState>((set) => ({
	buttonClickCount: 0, // Initialised as 0
	setButtonClickCount: (numberToAdd) =>
		set((state) => ({ buttonClickCount: state.buttonClickCount + numberToAdd })),
}));
