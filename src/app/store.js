import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomReducer from './roomsSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer,
    auth: authReducer,
  },
});

export default store;
