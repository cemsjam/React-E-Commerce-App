import { create } from "zustand";

interface ModalStates {
  modals: any[];
  append: (name: string, data?: any) => void;
  destroy: () => void;
  destroyAll: () => void;
}

const initialStates = {
  modals: [],
};
export const useModalStore = create<ModalStates>((set) => ({
  ...initialStates,
  append: (name, data) =>
    set((state) => {
      if (state.modals.length < 1) {
        state.modals = [{ name, data }];
        console.log("first added");
      } else {
        console.log("2nd added");

        console.log(name);
        const isModalExist = state.modals.find((modal) => modal.name === name);
        if (!isModalExist) {
          state.modals = [...state.modals, { name, data }];
        }
      }
      return state.modals;
    }),
  destroy: () =>
    set((state) => {
      if (state.modals.length > 0) {
        const newModals = state.modals;
        newModals.pop();
        console.log("popped", newModals);
        state.modals = newModals;
      }
      console.log("destroy called", state.modals);
      return state.modals;
    }),
  destroyAll: () =>
    set((state) => {
      state.modals = [];
      console.log("destroy all called");

      return state.modals;
    }),
}));
