import { create } from "zustand";

const initialStates = {
  cartItems: [],
  total: 0,
};

const store = (set) => ({
  ...initialStates,
  addToCart: (payload) =>
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
          cartItems: updatedItems,
          total: state.total + addedQuantity * payload.price,
        };
      } else {
        const newItem = { ...payload, quantity: addedQuantity };
        if (newItem) {
          return {
            cartItems: [...state.cartItems, newItem],
            total: state.total + newItem.price,
          };
        }
      }
    }),
  removeItem: (payload) =>
    set((state) => {
      if (payload) {
        const removedProductQuantity = payload.quantity;
        const filteredItems = state.cartItems.filter((item) => item.id !== payload.id);
        const currentTotal = state.total - payload.price * removedProductQuantity;
        return {
          cartItems: filteredItems,
          total: currentTotal,
        };
      }
    }),
  changeQuantity: (payload) =>
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
        const totalCost = newCartItems.reduce((acc, product) => (acc += product.price * product.quantity), 0);
        return {
          cartItems: newCartItems,
          total: totalCost,
        };
      }
    }),
});
export const useCartStore = create(store);
