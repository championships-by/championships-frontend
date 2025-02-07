import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  setUser,
  changeUserProfile,
  getUserProfile,
  getJudges,
  getUsersByName,
  getUnverifiedUsers,
} from "./thunk";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    unverifiedUsers: [],
    userProfile: [],
    judges: [],
    isLoading: false,
    isUserProfileLoading: true,
    isLoadingUnverifiedUsers: false,
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
      .addCase(setUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        //там где будет меняться поставить запрос getUserProfile и после удалить этот кейс
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isUserProfileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isUserProfileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isUserProfileLoading = false;
        state.error = action.error.message;
      })
      .addCase(getJudges.fulfilled, (state, action) => {
        state.judges = action.payload;
      })
      .addCase(getJudges.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUsersByName.pending, (state) => {
        state.error = null;
      })
      .addCase(getUsersByName.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUnverifiedUsers.pending, (state, action) => {
        state.isLoadingUnverifiedUsers = true;
        state.error = null;
      })
      .addCase(getUnverifiedUsers.fulfilled, (state, action) => {
        state.unverifiedUsers = action.payload;
        state.isLoadingUnverifiedUsers = false;
      })
      .addCase(getUnverifiedUsers.rejected, (state, action) => {
        state.isLoadingUnverifiedUsers = false;
        state.error = action.error.message;
      })
      ;
  },
});
