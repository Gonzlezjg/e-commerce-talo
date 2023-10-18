import { createSlice } from '@reduxjs/toolkit';
import { authenticateUser } from '../thunks/asyncThunks';

const initialState = {
  user: {
    isAuthenticated: false,
    id: null,
    accessToken: null,
    username: null,
    role: null,
    isActive: false,
  },
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.isAuthenticated = false;
      state.user.id = null;
      state.user.username = null;
      state.user.role = null;
      state.user.isActive = false;
      state.user.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.user.isAuthenticated = true;
        state.user.id = action.payload.user.id;
        state.user.username = action.payload.user.username;
        state.user.role = action.payload.user.role;
        state.user.accessToken = action.payload.accessToken;
        state.user.isActive = action.payload.user.isActive;
        state.loading = false;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
