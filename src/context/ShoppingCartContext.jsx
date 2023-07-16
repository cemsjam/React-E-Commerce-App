import React, { createContext, useContext, useReducer } from "react";
import { initialStates, cartReducer } from "@/reducers/cartReducer";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const ShoppingCartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialStates);
  const contextValue = { state, dispatch };
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
