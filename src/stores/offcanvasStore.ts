import { create } from "zustand";

interface CanvasStates {
	isOpen: boolean;
	toggleOffcanvas: () => void;
	closeOffcanvas: () => void;
	openOffcanvas: () => void;
}

export const useOffcanvasStore = create<CanvasStates>((set) => ({
	isOpen: false,
	toggleOffcanvas: () => set((state) => ({ isOpen: !state.isOpen })),
	closeOffcanvas: () => set(() => ({ isOpen: false })),
	openOffcanvas: () => set(() => ({ isOpen: true })),
}));
