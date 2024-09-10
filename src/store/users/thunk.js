import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@api'; 

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
      console.log('getUsers thunk dispatched');
      const response = await userApi.getUsers();
      return response.json();
    }
  );
  
export const setUser = createAsyncThunk(
    'users/setUser',
    async (body) => {
        const response = await userApi.setUser(body);
        return response.json();
    }
);

export const changeUserProfile = createAsyncThunk(
    'users/changeUserProfile',
    async (body) => {
        const response = await userApi.changeProfile(body);
        return response.json();
    }
);

export const getUserProfile = createAsyncThunk(
    'users/getUserProfile',
    async () => {
        const response = await userApi.getProfile();
        return response.json();
    }
);

export const getJudges = createAsyncThunk(
    'users/getJudges',
    async (limit) => {
        const response = await userApi.getJudges({limit});
        return response.json();
    }
);