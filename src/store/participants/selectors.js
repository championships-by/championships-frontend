import { createSelector } from "@reduxjs/toolkit";

export const getParticipantsSelector = createSelector(
  (state) => state.participants,
  (participants) => ({
    data: participants.data,
    isLoading: participants.isLoading,
    error: participants.error,
  })
);
