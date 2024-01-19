import { create } from "zustand";

type DrawerContent = {
	name: string;
	data?: object | any[];
};

type DrawerState = {
	drawer: any[] | null;
	openDrawer: ({ name, data }: DrawerContent) => void;
	closeDrawer: () => void;
};

export const useDrawerStore = create<DrawerState>((set: any) => ({
	drawer: null,
	openDrawer: ({ name, data }: DrawerContent) =>
		set(() => ({ drawer: data ? [{ name, data }] : [{ name }] })),
	closeDrawer: () => set(() => ({ drawer: [] })),
}));
