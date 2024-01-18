import { Product } from "@/types/Product";
import { UserResource } from "@clerk/types";
import { create } from "zustand";

type WishlistItem = {
	currentUser: UserResource | null | undefined;
	product: Product;
};

type WishlistState = {
	wishlists: Record<string, Product[]>;
	toggleWishlist: (payload: WishlistItem) => void;
	isProductInWishlist: (payload: WishlistItem) => boolean;
};

// Retrieve data from local storage on initial load
const initialState = (() => {
	try {
		const storedState = localStorage.getItem("wishlistKey");
		return storedState ? JSON.parse(storedState) : { wishlists: {} };
	} catch (error) {
		console.error("Error loading from local storage:", error);
		return { wishlists: {} };
	}
})();

export const useWishlistStore = create<WishlistState>((set, get) => ({
	...initialState,
	toggleWishlist: (payload: WishlistItem) => {
		set((state) => {
			const { wishlists } = state;
			const { currentUser, product } = payload;

			if (!currentUser) {
				// If not logged in, use a default wishlist
				const defaultWishlist = wishlists["default"] || [];
				const isProductInWishlist = defaultWishlist.includes(product);

				const updatedWishlist = isProductInWishlist
					? defaultWishlist.filter((item: Product) => item.id !== product.id)
					: [...defaultWishlist, product];

				const updatedState = {
					...state,
					wishlists: { ...wishlists, default: updatedWishlist },
				};

				// Persist the updated state to local storage
				try {
					localStorage.setItem("wishlistKey", JSON.stringify(updatedState));
				} catch (error) {
					console.error("Error saving to local storage:", error);
				}

				return updatedState;
			} else {
				// If logged in, use the user's wishlist
				const userWishlist = wishlists[currentUser.id] || [];
				const isProductInWishlist = userWishlist.includes(product);

				const updatedWishlist = isProductInWishlist
					? userWishlist.filter((item: Product) => item.id !== product.id)
					: [...userWishlist, product];

				const updatedState = {
					...state,
					wishlists: { ...wishlists, [currentUser.id]: updatedWishlist },
				};

				// Persist the updated state to local storage
				try {
					localStorage.setItem("wishlistKey", JSON.stringify(updatedState));
				} catch (error) {
					console.error("Error saving to local storage:", error);
				}

				return updatedState;
			}
		});
	},
	isProductInWishlist: (payload: WishlistItem) => {
		const { wishlists } = get();

		if (!payload.currentUser) {
			const defaultWishlist = wishlists["default"] || [];
			return defaultWishlist.some((item) => item.id === payload.product.id);
		} else {
			const userWishlist = wishlists[payload.currentUser.id] || [];
			return userWishlist.some((item) => item.id === payload.product.id);
		}
	},
}));
