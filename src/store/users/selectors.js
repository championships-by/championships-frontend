import { createSelector } from "@reduxjs/toolkit";

export const getUsersSelector = createSelector(
  (state) => state.users,
  (users) => ({
    data: users.data,
    isLoading: users.isLoading,
    error: users.error,
  })
);
