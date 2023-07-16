export const initialStates = {
  cartItems: [],
  total: 0,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const thisCartProduct = state.cartItems.find((el) => el.id === action.payload.id);
      const addedQuantity = action.payload.quantity ? action.payload.quantity : 1;
      if (thisCartProduct) {
        const existingQuantity = thisCartProduct.quantity;
        const totalQuantity = existingQuantity + addedQuantity;
        const updatedItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: totalQuantity };
          } else {
            return item;
          }
        });
        return {
          cartItems: updatedItems,
          total: state.total + addedQuantity * action.payload.price,
        };
      } else {
        const newItem = { ...action.payload, quantity: addedQuantity };

        return {
          cartItems: [...state.cartItems, newItem],
          total: state.total + newItem.price,
        };
      }

    case "REMOVE_ITEM":
      const removedProductQuantity = action.payload.quantity;
      const filteredItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      const currentTotal = state.total - action.payload.price * removedProductQuantity;
      return {
        cartItems: filteredItems,
        total: currentTotal,
      };
    case "CHANGE_QUANTITY":
      const newQuantity = action.payload.quantity;
      const newCartItems = state.cartItems.map((product) => {
        if (product.id === action.payload.id) {
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
    default:
      throw new Error("No action type for this");
  }
};
