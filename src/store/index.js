import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
