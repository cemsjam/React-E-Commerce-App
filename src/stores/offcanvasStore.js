import { create } from "zustand";

const initialStates = {
  isOpen: false,
};

export const useOffcanvasStore = create((set) => ({
  ...initialStates,
  toggleOffcanvas: () => set((state) => ({ isOpen: !state.isOpen })),
  closeOffcanvas: () => set(() => ({ isOpen: false })),
  openOffcanvas: () => set(() => ({ isOpen: true })),
}));
