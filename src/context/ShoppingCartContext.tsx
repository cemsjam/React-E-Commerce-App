import React, { createContext, useContext, useReducer } from "react";
import { initialStates, cartReducer, CartState, CartAction } from "@/reducers/cartReducer";

export const CartContext = createContext<
	{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be within an ShoppingCartContextProvider");
	}
};

export const ShoppingCartContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, initialStates);
	const contextValue = { state, dispatch };
	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
