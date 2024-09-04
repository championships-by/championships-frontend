import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './thunk';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    isLoading : () => {
      return { loading: true };
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      state = state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;