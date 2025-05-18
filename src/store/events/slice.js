import { createSlice } from "@reduxjs/toolkit";
import { defaultEventFilterOptions } from "@/const";
import {
  changeEvent,
  changeLogo,
  changeRegulation,
  deleteEvent,
  getEvent,
  getEventWithNominations,
  getEventsRelatedToDate,
  setEvent,
} from "./thunk";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    search: "",
    filters: defaultEventFilterOptions,
    date: new Date().toISOString(),
  },
  reducers: {
    setEventSearchValue: (state, action) => {
      state.search = action.payload;
    },
    setEventFilters: (state, action) => {
      state.filters = action.payload;
    },
    setEventDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getEventWithNominations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEventWithNominations.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getEventWithNominations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getEventsRelatedToDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEventsRelatedToDate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getEventsRelatedToDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(changeEvent.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(changeEvent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeLogo.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(changeLogo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeRegulation.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(changeRegulation.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (event) => event.id !== action.payload.id
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(setEvent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(setEvent.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setEventFilters, setEventSearchValue, setEventDate } =
  eventsSlice.actions;
