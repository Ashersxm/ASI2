// src/app/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for logging in the user
export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await axios.post('http://localhost:8083/auth', credentials);
  return response.data; // Assuming the response contains the user data and token
});

// Thunk for registering a new user
export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  const response = await axios.post('http://localhost:8083/user', userData);
  return response.data; // Assuming response contains new user data
});

// Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async (userId) => {
  const response = await axios.get(`http://localhost:8083/user/${userId}`);
  return response.data; // This should include user details
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [], // For storing registered users
    userId: null,
    token: null,
    isLoggedIn: false, // Track if the user is logged in
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
      state.success = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.isLoggedIn = true;
        state.error = null;
        const { token, userId } = action.payload;
        state.token = token;
        state.userId = userId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.error = 'Invalid credentials. Please try again.';
        state.success = false;
      })

      // Handle fetching user details
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.error = 'Failed to fetch user details.';
      })

      // Handle user registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
