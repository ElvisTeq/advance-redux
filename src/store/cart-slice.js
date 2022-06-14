import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; // action.payload => default name of value passes as argument
      const existingItem = state.items.find((item) => item.id === newItem.id); // Find/Get if exist already
      state.totalQuantity++; // Cart quantity++

      // Add Item to list
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        // item Quantity + 1, Update Total
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload; // removeItemFromCart() => will receive an ID when is called from another component
      const existingItem = state.items.find((item) => item.id === id); //  find/get item
      state.totalQuantity--; // Cart quantity--

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions; // For dispatching

export default cartSlice; // For the Main store
