import {  createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated:'',
    email: '',
    name: '',
    id:'',
    address:{
      country:'',
      state:'',
      city:'',
      street:'',
      pincode:'',
      landmark:'',
      phoneNumber:'',    
    }
  },
  reducers: {
    setUserData: (state, action) => {   
      console.log(action, 'action');
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isAuthenticated = action.payload.isAuthenticated
    },
    setAddressData: (state, action) => {
      console.log(action, 'action');
      state.address.street = action.payload.street ?? state.address.street;
      state.address.city = action.payload.city ?? state.address.city;
      state.address.state = action.payload.state ?? state.address.state;
      state.address.phoneNumber = action.payload.phoneNumber ?? state.address.phoneNumber;
      state.address.pincode = action.payload.pincode ?? state.address.pincode;
      state.address.landmark = action.payload.landmark ?? state.address.landmark;
      state.address.country = action.payload.country ?? state.address.country;
    },
    clearUser: (state) => {
      state.email = '';
      state.name = '';
      state.id = '';
      state.isAuthenticated = '';
      state.address.street = '';
      state.address.city = '';
      state.address.state = '';
      state.phoneNumber = '';
      state.address.pincode = '';
      state.address.landmark = '';
      state.address.country = '';
    },
  },
  
});

export const { setUserData,setAddressData, clearUser } = userSlice.actions;
export default userSlice.reducer;
