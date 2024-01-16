import { create } from "zustand";

type CartItem = {
	id: number;
	title: string;
	quantity: number;
	price: number;
	thumbnail: string;
};

type InitialStates = {
	cartItems: CartItem[];
	total: number;
};

type CartState = InitialStates & {
	cartItems: CartItem[];
	total: number;
	addToCart: (payload: CartItem) => void;
	removeFromCart: (payload: CartItem) => void;
	changeQuantity: (payload: CartItem) => void;
};

type SetState = (fn: (state: CartState) => CartState) => void;

const initialStates: InitialStates = {
	cartItems: [],
	total: 0,
};

const store = (set: SetState) => ({
	...initialStates,
	addToCart: (payload: CartItem) =>
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
	removeFromCart: (payload: CartItem) =>
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
	changeQuantity: (payload: CartItem) =>
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
});
export const useCartStore = create<CartState>(store);
