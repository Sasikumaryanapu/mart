import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.count = action.payload.count;
      } else {
        state.push(product);
      }
    },
    updateProductCount: (state, action) => {
      const { id, count } = action.payload;
      const existingProduct = state.find(item => item.id == id);
      if (existingProduct) {
        existingProduct.count = count;
      }
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      return state.filter(product => product.id !== id);
    },
  },
});

export const { addToCart, updateProductCount, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
