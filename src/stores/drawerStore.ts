import { create } from "zustand";

type DrawerContent = {
  name: string;
  data?: object | any[];
};

type DrawerState = {
  drawer: [] | null;
};

type Actions = {
  openDrawer: ({ name, data }: DrawerContent) => void;
  closeDrawer: () => void;
};

const initialStates: DrawerState = {
  drawer: null,
};

export const useDrawerStore = create<DrawerState, Actions>((set: any) => ({
  openDrawer: ({ name, data }: DrawerContent) => set(() => ({ drawer: data ? [{ name, data }] : [{ name }] })),
  closeDrawer: () => set(() => ({ drawer: [] })),
}));
