import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi, authApi } from "@/api";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const data = await userApi.getUsers();
  return data;
});

export const getUnverifiedUsers = createAsyncThunk(
  "users/getUnverifiedUsers",
  async () => {
    const data = await userApi.getUnverifiedUsers();
    return data;
  }
);

export const getUsersByName = createAsyncThunk(
  "users/getUsersByName",
  async (params) => {
    const data = await userApi.getUsersByName(params);
    return data;
  }
);

export const setUser = createAsyncThunk("users/setUser", async (body) => {
  const response = await userApi.setUser(body);
  return response.config.data;
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

export const getJudges = createAsyncThunk("users/getJudges", async () => {
  const data = await userApi.getJudges();
  return data;
});

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.setLogout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
