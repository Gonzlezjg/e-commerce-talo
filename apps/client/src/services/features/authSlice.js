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
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.user.isAuthenticated = true;
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
      state.user.role = action.payload.role;
      state.user.accessToken = action.payload.accessToken;
      state.user.isActive = action.payload.isActive;
    });
  },
});
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
