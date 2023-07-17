import { create } from "zustand";
import { toast } from "react-hot-toast";
const initialStates = {
  cartItems: [],
  total: 0,
};

export const useCartStore = create((set) => ({
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
        toast.success(`${newItem.title} added to cart!`);
        return {
          cartItems: [...state.cartItems, newItem],
          total: state.total + newItem.price,
        };
      }
    }),
}));
