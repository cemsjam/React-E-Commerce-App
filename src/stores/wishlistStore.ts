import { UserResource } from "@clerk/types";
import { create } from "zustand";

export type WishlistProduct = {
	id: number;
	title: string;
	quantity: number;
	price: number;
	thumbnail: string;
};
type WishlistItem = {
	currentUser: UserResource | null | undefined;
	product: WishlistProduct;
};

type WishlistState = {
	wishlists: {};
	addToWishlist: (payload: WishlistItem) => void;
	// removeFromWishlist: (payload: WishlistItem) => void;
};

type SetState = (fn: (state: WishlistState) => WishlistState) => void;

const store = (set: SetState) => ({
	wishlists: {},
	addToWishlist: (payload: WishlistItem) => {
		console.log("add to wishlist");
		set((state) => {
			const { wishlists } = state;
			const { currentUser, product } = payload;

			if (!currentUser) {
				// If not logged in, use a default wishlist
				const defaultWishlist = wishlists["default"] || [];
				const updatedWishlist = [...defaultWishlist, product];

				const updatedState = {
					...state,
					wishlists: { ...wishlists, default: updatedWishlist },
				};

				// Persist the updated state to local storage
				localStorage.setItem("wishlistKey", JSON.stringify(updatedState));

				return updatedState;
			} else {
				// If logged in, use the user's wishlist
				const userWishlist = wishlists[currentUser.id] || [];
				const updatedWishlist = [...userWishlist, product];

				const updatedState = {
					...state,
					wishlists: { ...wishlists, [currentUser.id]: updatedWishlist },
				};

				// Persist the updated state to local storage
				localStorage.setItem("wishlistKey", JSON.stringify(updatedState));

				return updatedState;
			}
		});
	},
	// persistToLocalStorage: () => {
	//   const storageKey = 'myZustandKey';

	//   // Try to load from local storage
	//   const storedState = JSON.parse(localStorage.getItem(storageKey));

	//   // If there's stored state, set it as the initial state
	//   if (storedState) {
	//     set(storedState);
	//   }

	//   // Subscribe to changes in the Zustand store
	//   return (state) => {
	//     localStorage.setItem(storageKey, JSON.stringify(state));
	//   };
	// },
	// removeFromWishlist: (payload: WishlistItem) =>
	// 	set((state) => {
	// 		if (payload) {
	// 			const filteredItems = state.wishlistItems.filter(
	// 				(item) => item.product.id !== payload.product.id
	// 			);
	// 			return {
	// 				...state,
	// 				wishlistItems: filteredItems,
	// 			};
	// 		}
	// 		return state;
	// 	}),
});

// store.subscribe(store.persistToLocalStorage());
export const useWishlistStore = create<WishlistState>(store);
