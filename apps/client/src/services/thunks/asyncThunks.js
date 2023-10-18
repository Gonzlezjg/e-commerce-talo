import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserAPI,
  readUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from '../../utils/userApi';
import axios from 'axios';

/**
 * AUTHENTICATION
 */

// Acción asíncrona para autenticar
export const authenticateUser = createAsyncThunk(
  'authentication/authenticateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userData.user,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * CRUD DE USUARIOS
 */

// Acción asíncrona para crear un usuario
export const createUser = createAsyncThunk(
  'user/create',
  async (
    { username, password, email, role, firstname, isActive, accessToken },
    { rejectWithValue }
  ) => {
    try {
      const response = await createUserAPI(
        {
          username,
          password,
          email,
          role,
          firstname,
          isActive,
        },
        accessToken
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const readUser = createAsyncThunk(
  'user/getById',
  async (userId, accessToken, { rejectWithValue }) => {
    try {
      const response = await readUserAPI(userId, accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    {
      userId,
      username,
      password,
      email,
      role,
      firstname,
      isActive,
      accessToken,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserAPI(
        userId,
        {
          username,
          password,
          email,
          role,
          firstname,
          isActive,
        },
        accessToken
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async ({ userId, accessToken }, { rejectWithValue }) => {
    try {
      console.log(userId, accessToken);
      const response = await deleteUserAPI(userId, accessToken);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/all`, {
        headers: { 'A-Token': accessToken },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
