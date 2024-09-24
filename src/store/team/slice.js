import { createSlice } from "@reduxjs/toolkit";
import { getTeams, setTeams, updateTeam } from "./thunk";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setTeams.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(setTeams.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (team) => team.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
