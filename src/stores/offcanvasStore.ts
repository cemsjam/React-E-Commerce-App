import { create } from "zustand";

interface CanvasStates {
  isOpen: boolean;
  toggleOffcanvas: () => void;
  closeOffcanvas: () => void;
  openOffcanvas: () => void;
}

const initialStates = {
  isOpen: false,
};

export const useOffcanvasStore = create<CanvasStates>((set) => ({
  ...initialStates,
  toggleOffcanvas: () => set((state) => ({ isOpen: !state.isOpen })),
  closeOffcanvas: () => set(() => ({ isOpen: false })),
  openOffcanvas: () => set(() => ({ isOpen: true })),
}));
