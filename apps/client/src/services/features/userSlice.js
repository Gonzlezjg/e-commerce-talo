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
  reducers: {
    removeUserFromState: (state, action) => {
      const existingUserIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );

      state.users.splice(existingUserIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = 'Error al editar usuario';
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userIdToDelete = action.payload;
        state.users = state.users.filter((user) => user.id !== userIdToDelete);
        state.feedback = 'Usuario eliminado';
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = 'Error al eliminar usuario';
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { removeUserFromState } = userSlice.actions;
export default userSlice.reducer;
