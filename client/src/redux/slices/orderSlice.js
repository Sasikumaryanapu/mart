import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    addToOrder: (state, action) => {
      const product = action.payload;

      const existingProduct = state.find(item => item.productId._id === product.productId._id);
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
      } else {
        state.push(product);
      }

    },
    updateOrderCount: (state, action) => {
      const { id, quantity } = action.payload;
      console.log('Current state before update:', JSON.stringify(state, null, 2));
      console.log('Updating product ID:', id, 'New quantity:', quantity);

      const existingProduct = state.find(item => item.productId._id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }

      console.log('State after update:', JSON.stringify(state, null, 2));
    },
    removeProductOrder: (state, action) => {
      const id = action.payload;
      console.log('Current state before removal:', JSON.stringify(state, null, 2));
      console.log('Removing product ID:', id);

      const updatedState = state.filter(product => product.productId._id !== id);

      console.log('State after removal:', JSON.stringify(updatedState, null, 2));
      return updatedState;
    },
  },
});

export const { addToOrder, updateOrderCount, removeProductOrder } = orderSlice.actions;
export default orderSlice.reducer;
