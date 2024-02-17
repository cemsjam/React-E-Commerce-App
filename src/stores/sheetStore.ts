import { create } from "zustand";

export type ModalType = "openMainNavigation";

type SheetData = {
	data?: object | any[];
};

type SheetStore = {
	type: ModalType | null;
	data: SheetData;
	isOpen: boolean;
	onOpen: (type: ModalType, data?: SheetData) => void;
	onClose: () => void;
};

export const useSheetStore = create<SheetStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ isOpen: false, type: null }),
}));
