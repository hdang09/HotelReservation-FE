import { configureStore } from '@reduxjs/toolkit'
import roomReducer from './roomsSlice'

const store = configureStore({
  reducer: {
    rooms: roomReducer,
  },
})

export default store
