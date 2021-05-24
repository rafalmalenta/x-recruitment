import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from "../features/seatsSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});

