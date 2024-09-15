import { createSlice } from "@reduxjs/toolkit";
import {
  getEvent,
  getEventWithNominations,
  changeEvent,
  changeLogo,
  changeRegulation,
  deleteEvent,
  setEvent,
} from "./thunk";

export const eventsSlice = createSlice({
  name: "events",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
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

export const { setLoading, addEvent, deleteEvent, updateEvent, setError } =
  eventsSlice.actions;
