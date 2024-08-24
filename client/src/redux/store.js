// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlices from './slices/userSlices';
import orderSlice from './slices/orderSlice';

const store = configureStore({
  reducer: {
    user:userSlices,
    cart:cartSlice,
    order:orderSlice
  },
});

export default store;
