import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer
  },
});