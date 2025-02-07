import { createSelector } from "@reduxjs/toolkit";

export const getUsersSelector = createSelector(
  (state) => state.users,
  (users) => ({
    data: users.allUsers,
    isLoading: users.isLoading,
    error: users.error,
  })
);

export const getUnverifiedUsersSelector = createSelector(
  (state) => state.users,
  (users) => ({
    data: users.unverifiedUsers,
    isLoading: users.isLoadingUnverifiedUsers,
    error: users.error,
  })
);

export const getUserSelector = createSelector(
  (state) => state.users,
  (users) => ({
    data: users.userProfile,
    isLoading: users.isUserProfileLoading,
    error: users.error,
  })
);
