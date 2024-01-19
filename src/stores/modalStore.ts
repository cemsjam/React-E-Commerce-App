import { create } from "zustand";

type ModalStates = {
	modals: any[];
	append: (name: string, data?: {} | []) => void;
	destroy: () => void;
	destroyAll: () => void;
};

export const useModalStore = create<ModalStates>((set) => ({
	modals: [],
	append: (name, data) =>
		set((state) => {
			const { modals } = state;
			if (modals.length < 1) {
				const newModals = [{ name, data }];
				return { ...state, modals: newModals };
			} else {
				const isModalExist = modals.find((modal) => modal.name === name);
				if (!isModalExist) {
					const updatedModals = [...modals, { name, data }];
					return { ...state, modals: updatedModals };
				} else {
					return state;
				}
			}
		}),
	destroy: () =>
		set((state) => {
			if (state.modals.length > 0) {
				const newModals = state.modals;
				newModals.pop();
				return { ...state, modals: newModals };
			}
			return state;
		}),
	destroyAll: () =>
		set((state) => {
			return { ...state, modals: [] };
		}),
}));
