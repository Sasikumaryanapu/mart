// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlices from './slices/userSlices';

const store = configureStore({
  reducer: {
    user:userSlices,
    cart:cartSlice,
  },
});

export default store;
