import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from "../features/seatsSlice";
import userChoiceSlice from "../features/userChoiceSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
    userChoice: userChoiceSlice,
  },
});

