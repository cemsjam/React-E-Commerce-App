import { create } from "zustand";

type ModalStates = {
	modals: any[];
	append: (name: string, data?: {} | []) => void;
	destroy: () => void;
	destroyAll: () => void;
};

const initialStates = {
	modals: [],
};
export const useModalStore = create<ModalStates>((set) => ({
	...initialStates,
	append: (name, data) =>
		set((state) => {
			if (state.modals.length < 1) {
				state.modals = [{ name, data }];
			} else {
				const isModalExist = state.modals.find((modal) => modal.name === name);
				if (!isModalExist) {
					state.modals = [...state.modals, { name, data }];
				}
			}
			console.log(state.modals);
			return state.modals;
		}),
	destroy: () =>
		set((state) => {
			if (state.modals.length > 0) {
				const newModals = state.modals;
				newModals.pop();
				state.modals = newModals;
			}
			console.log("destroy called", state.modals);
			return state.modals;
		}),
	destroyAll: () =>
		set((state) => {
			state.modals = [];
			return state.modals;
		}),
}));
