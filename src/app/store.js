import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomReducer from './roomsSlice';
import primaryColorReducer from './primaryColorSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer,
    auth: authReducer,
    color: primaryColorReducer,
  },
});

export default store;
