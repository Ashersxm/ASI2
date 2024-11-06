// src/app/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await axios.post('http://localhost:8083/auth', credentials);
  return response.data; // Assuming the response contains the user data and token
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isAuthenticated: false,
    token: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token; // Assuming the token is returned in the payload
        localStorage.setItem('token', action.payload.token); // Save token to local storage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
