import { createSlice } from '@reduxjs/toolkit';
import isDarkMode from '../utils/isDarkMode';

const initialState = {
  color: JSON.parse(localStorage.getItem('primary-color')) || '#ffa500',
  theme: isDarkMode ? 'dark' : 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.color = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const colorSelector = (state) => state.settings?.color;
export const themeSelector = (state) => state.settings?.theme;
export const { setPrimaryColor, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
