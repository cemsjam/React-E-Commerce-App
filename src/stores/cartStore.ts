import { Product } from "@/types/Product";
import { UserResource } from "@clerk/types";
import { create } from "zustand";

type CartPayload = {
	currentUser: UserResource | null | undefined;
	product: Product;
};

type CartState = {
	cartItems: Record<string, Product[]>;
	addToCart: (payload: CartPayload) => void;
	removeFromCart: (payload: CartPayload) => void;
	changeQuantity: (payload: CartPayload) => void;
};

const initialState = (() => {
	try {
		const storedState = localStorage.getItem("cartKey");
		return storedState ? JSON.parse(storedState) : { cartItems: {} };
	} catch (error) {
		console.error("Error loading from local storage:", error);
		return { cartItems: {} };
	}
})();

export const useCartStore = create<CartState>((set) => ({
	...initialState,
	addToCart: (payload: CartPayload) =>
		set((state) => {
			const { cartItems } = state;
			const { currentUser, product } = payload;
			if (!currentUser) {
				const defaultCart = cartItems["default"] || [];
				const isProductInCart = defaultCart.find((el) => el.id === product.id);

				const updatedCart = isProductInCart
					? defaultCart.map((el) => {
							if (el.id === product.id) {
								return { ...el, quantity: el.quantity + 1 };
							} else {
								return el;
							}
					  })
					: [...defaultCart, { ...product, quantity: 1 }];

				const updatedState = {
					...state,
					cartItems: { ...cartItems, default: updatedCart },
				};
				try {
					localStorage.setItem("cartKey", JSON.stringify(updatedState));
				} catch (error) {
					console.error("Error saving to local storage:", error);
				}
				return updatedState;
			} else {
				const userCart = cartItems[currentUser.id] || [];
				const isProductInCart = userCart.find((el) => el.id === product.id);
				const updatedCart = isProductInCart
					? userCart.map((el) => {
							if (el.id === product.id) {
								return { ...el, quantity: el.quantity + 1 };
							} else {
								return el;
							}
					  })
					: [...userCart, { ...product, quantity: 1 }];

				const updatedState = {
					...state,
					cartItems: { ...cartItems, [currentUser.id]: updatedCart },
				};
				try {
					localStorage.setItem("cartKey", JSON.stringify(updatedState));
				} catch (error) {
					console.error("Error saving to local storage:", error);
				}
				return updatedState;
			}
		}),
	removeFromCart: (payload: CartPayload) =>
		set((state) => {
			const { cartItems } = state;
			const { currentUser, product } = payload;
			const currentCart = currentUser
				? cartItems[currentUser.id] || []
				: cartItems["default"] || [];

			const updatedCart = currentCart.filter((el) => el.id !== product.id);

			const updatedState = {
				...state,
				cartItems: { ...cartItems, [currentUser ? currentUser.id : "default"]: updatedCart },
			};

			try {
				localStorage.setItem("cartKey", JSON.stringify(updatedState));
			} catch (error) {
				console.error("Error saving to local storage:", error);
			}
			return updatedState;
		}),
	changeQuantity: (payload: CartPayload) =>
		set((state) => {
			const { cartItems } = state;
			const { currentUser, product } = payload;

			const currentCart = currentUser
				? cartItems[currentUser.id] || []
				: cartItems["default"] || [];

			const updatedCart = currentCart.map((el) => (el.id === product.id ? product : el));

			const updatedState = {
				...state,
				cartItems: { ...cartItems, [currentUser ? currentUser.id : "default"]: updatedCart },
			};

			try {
				localStorage.setItem("cartKey", JSON.stringify(updatedState));
			} catch (error) {
				console.error("Error saving to local storage:", error);
			}
			return updatedState;
		}),
}));
