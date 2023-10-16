import { createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  deleteUser,
  getAllUsers,
  readUser,
  updateUser,
} from '../thunks/asyncThunks';

const initialState = {
  feedback: '',
  error: null,
  loading: false,
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.feedback = 'User created successfully';
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.error = 'Failed to create user';
        state.loading = false;
      })
      .addCase(readUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(readUser.fulfilled, (state) => {
        state.feedback = 'User read successfully';
        state.loading = false;
      })
      .addCase(readUser.rejected, (state) => {
        state.error = 'Failed to read user';
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.feedback = 'User updated successfully';
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = 'Failed to update user';
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.feedback = 'User deleted successfully';
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = 'Failed to delete user';
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.feedback = 'All users retrieved successfully';
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.error = 'Failed to retrieve all users';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
