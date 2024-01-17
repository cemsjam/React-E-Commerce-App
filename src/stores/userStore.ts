import { create } from "zustand";
import { UserResource } from "@clerk/types";

interface UserState {
	currentUser: UserResource | null;
	setCurrentUser: (user: UserResource | null | undefined) => void;
}

const useUserStore = create<UserState>((set) => ({
	currentUser: null,
	setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useUserStore;
