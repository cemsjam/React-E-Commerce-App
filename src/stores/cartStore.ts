import { Product } from "@/types/Product";
import { UserResource } from "@clerk/types";
import { create } from "zustand";

type CartPayload = {
	user: UserResource | null | undefined;
	product: Product;
};

type InitialStatesType = {
	cartItems: Product[];
	total: number;
};

type CartState = InitialStatesType & {
	addToCart: (payload: Product) => void;
	removeFromCart: (payload: Product) => void;
	changeQuantity: (payload: Product) => void;
};

const initialStates: InitialStatesType = {
	cartItems: [],
	total: 0,
};

export const useCartStore = create<CartState>((set) => ({
	...initialStates,
	addToCart: (payload: Product) =>
		set((state) => {
			const thisCartProduct = state.cartItems.find((el) => el.id === payload.id);
			const addedQuantity = payload.quantity ? payload.quantity : 1;
			if (thisCartProduct) {
				const existingQuantity = thisCartProduct.quantity;
				const totalQuantity = existingQuantity + addedQuantity;
				const updatedItems = state.cartItems.map((item) => {
					if (item.id === payload.id) {
						return { ...item, quantity: totalQuantity };
					} else {
						return item;
					}
				});
				return {
					...state,
					cartItems: updatedItems,
					total: state.total + addedQuantity * payload.price,
				};
			} else {
				const newItem = { ...payload, quantity: addedQuantity };
				if (newItem) {
					return {
						...state,
						cartItems: [...state.cartItems, newItem],
						total: state.total + newItem.price,
					};
				}
			}
			return state;
		}),
	removeFromCart: (payload: Product) =>
		set((state) => {
			if (payload) {
				const removedProductQuantity = payload.quantity;
				const filteredItems = state.cartItems.filter((item) => item.id !== payload.id);
				const currentTotal = state.total - payload.price * removedProductQuantity;
				return {
					...state,
					cartItems: filteredItems,
					total: currentTotal,
				};
			}
			return state;
		}),
	changeQuantity: (payload: Product) =>
		set((state) => {
			if (payload) {
				const newQuantity = payload.quantity;
				const newCartItems = state.cartItems.map((product) => {
					if (product.id === payload.id) {
						return { ...product, quantity: newQuantity };
					} else {
						return product;
					}
				});
				const totalCost = newCartItems.reduce(
					(acc, product) => (acc += product.price * product.quantity),
					0
				);
				return {
					...state,
					cartItems: newCartItems,
					total: totalCost,
				};
			}
			return state;
		}),
}));
