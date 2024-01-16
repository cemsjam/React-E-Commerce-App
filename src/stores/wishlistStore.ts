import { create } from "zustand";

type WishlistProduct = {
	id: number;
	title: string;
	quantity: number;
	price: number;
	thumbnail: string;
};
type WishlistItem = {
	user: {
		isAuthenticated: boolean;
		userEmail?: string;
	};
	product: WishlistProduct[];
};
type InitialStates = {
	wishlistItems: WishlistItem[];
};

type WishlistState = InitialStates & {
	wishlistItems: WishlistItem[];
	addToWishlist: (payload: WishlistItem) => void;
	removeFromWishlist: (payload: WishlistItem) => void;
};

type SetState = (fn: (state: WishlistState) => WishlistState) => void;

const initialStates: InitialStates = {
	wishlistItems: [],
};

const store = (set: SetState) => ({
	...initialStates,
	addToWishlist: (payload: WishlistItem) => {
		console.log("add to wishlist");
		set((state) => {
			const newItem = { ...payload };
			if (newItem) {
				return {
					...state,
					wishlistItems: [...state.wishlistItems, newItem],
				};
			}
			return state;
		});
	},
	removeFromWishlist: (payload: WishlistItem) =>
		set((state) => {
			if (payload) {
				const filteredItems = state.wishlistItems.filter((item) => item.id !== payload.id);
				return {
					...state,
					wishlistItems: filteredItems,
				};
			}
			return state;
		}),
});
export const useWishlistStore = create<WishlistState>(store);
