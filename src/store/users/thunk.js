import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@api";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const data = await userApi.getUsers();
  return data;
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
    const data = await userApi.getProfile();
    return data;
  }
);

export const getJudges = createAsyncThunk("users/getJudges", async (limit) => {
  const data = await userApi.getJudges({ limit });
  return data;
});
