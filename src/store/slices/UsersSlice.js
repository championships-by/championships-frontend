import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { userApi } from '@api'; 

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
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
      return action.payload; // update the state with the fetched users
    });
  },
});

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const response = await userApi.getUsers();
    return response.json();
  }
);

export const setUser = createAsyncThunk(
  'users/setUsers',
  async (body) => {
    const response = await userApi.setUser(JSON.stringify(body));
    return response.json();
  }
);

export const { addUser, deleteUser, updateUser } = usersSlice.actions;