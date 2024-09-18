import { createSelector } from "@reduxjs/toolkit";

export const getTeamsSelector = createSelector(
  (state) => state.teams,
  (teams) => ({
    data: teams.data,
    isLoading: teams.isLoading,
    error: teams.error,
  })
);
