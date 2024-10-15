import { createSelector } from "@reduxjs/toolkit";

export const getEventsSelector = createSelector(
  (state) => state.events,
  (events) => ({
    data: events.data,
    isLoading: events.isLoading,
    error: events.error,
    search: events.search,
    filters: events.filters,
    date: events.date,
  })
);
