import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@api'; 

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
      const response = await userApi.getUsers();
      return response.json();
    }
  );
  
export const setUser = createAsyncThunk(
    'users/setUser',
    async (body) => {
        const response = await userApi.setUser(JSON.stringify(body));
        return response.json();
    }
);

export const upadateUser = createAsyncThunk(
    'users/updateUser',
    async (body) => {
        const response = await userApi.changeProfile(JSON.stringify(body));
        return response.json();
    }
);