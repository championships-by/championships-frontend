import { createSlice } from "@reduxjs/toolkit";
import {
  getParticipant,
  setHideParticipant,
  setParticipant,
  changeParticipant,
  getParticipantsWithInfo,
} from "./thunk";

export const participantsSlice = createSlice({
  name: "participants",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getParticipant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getParticipant.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setHideParticipant.fulfilled, (state, action) => {
        // handle hide participant logic
      })
      .addCase(setHideParticipant.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(setParticipant.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(setParticipant.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeParticipant.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (participant) => participant.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(changeParticipant.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getParticipantsWithInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getParticipantsWithInfo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

