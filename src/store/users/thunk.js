import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@api";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await userApi.getUsers();
  return response.data;
});

export const setUser = createAsyncThunk("users/setUser", async (body) => {
  const response = await userApi.setUser(body);
  if (response.status === 200) {
    return response.config.data;
  }
  return response.data;
});

export const changeUserProfile = createAsyncThunk(
  "users/changeUserProfile",
  async (body) => {
    const response = await userApi.changeProfile(body);
    return response.config.data;
  }
);

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async () => {
    const response = await userApi.getProfile();
    return response.data;
  }
);

export const getJudges = createAsyncThunk("users/getJudges", async (limit) => {
  const response = await userApi.getJudges({ limit });
  return response.data;
});
