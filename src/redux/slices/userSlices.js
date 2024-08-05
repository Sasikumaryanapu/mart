import {  createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    id:''
  },
  reducers: {
    setUserData: (state, action) => {   
      console.log(action, 'action');
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    clearUser: (state) => {
      state.email = '';
      state.name = '';
      state.id = '';

    },
  },
  
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
