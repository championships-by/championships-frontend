import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  setUser,
  changeUserProfile,
  getUserProfile,
  getJudges,
} from "./thunk";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    userProfile: [],
    judges: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.allUsers.push(action.payload);
      })
      .addCase(setUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        const index = state.allUsers.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.allUsers[index] = action.payload;
        }
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getJudges.fulfilled, (state, action) => {
        state.judges = action.payload;
      })
      .addCase(getJudges.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
