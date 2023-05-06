import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';




const initialState = {
  dark: false,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    darkMode: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { darkMode } = cartSlice.actions;
export default cartSlice.reducer;