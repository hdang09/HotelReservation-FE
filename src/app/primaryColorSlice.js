import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  primary: JSON.parse(localStorage.getItem('primary-color')) || '#ffa500',
};

const primaryColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    set: (state, action) => {
      state.primary = action.payload;
    },
  },
});

export const colorSelector = (state) => state.color?.primary;
export const { set } = primaryColorSlice.actions;
export default primaryColorSlice.reducer;
