import { createSelector } from '@reduxjs/toolkit';

export const getUsersSelector = createSelector(
  (state) => state.users,
  (users) => users
);

export const getIsLoadingSelector = createSelector(
  (state) => state.isLoading,
  (isLoading) => isLoading
);