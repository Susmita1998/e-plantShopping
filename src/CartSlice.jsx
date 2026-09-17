/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, price, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ id, name, image, price, cost: cost ?? `$${Number(price).toFixed(2)}`, quantity: 1 });
    },
    removeItem: (state, action) => {
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.name === name);
      if (!item) return;
      if (quantity <= 0) state.items = state.items.filter((cartItem) => cartItem.name !== name);
      else item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
