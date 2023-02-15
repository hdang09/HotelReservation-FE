import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomReducer from './roomsSlice';
import settingsReducer from './settingsSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
});

export default store;
