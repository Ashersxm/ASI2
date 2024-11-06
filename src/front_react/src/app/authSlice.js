import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for logging in the user
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await axios.post('http://localhost:8083/auth', credentials);
  return response.data; // Return the response data, including the user ID
});

// Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (userId) => {
  const response = await axios.get(`http://localhost:8083/user/${userId}`);
  return response.data; // This should include user details
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userId: null, // Initialize userId
    error: null,
    success: false,
    isLoggedIn: false, // Track if the user is logged in
  },
  reducers: {
    logout: (state) => {
      state.user = null;  // Clear user on logout
      state.userId = null; // Clear userId on logout
      state.success = false; // Reset success status
      state.error = null; // Clear any errors
      state.isLoggedIn = false; // Update login status
      localStorage.removeItem('user'); // Clear user from localStorage
      localStorage.removeItem('userId'); // Clear userId from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.error = null;
        const userId = action.payload;
        state.userId = userId; // Store user ID in state
        state.isLoggedIn = true; // Update login status
        localStorage.setItem('userId', userId); // Store user ID in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = 'Invalid credentials. Please try again.';
        state.success = false;
        state.isLoggedIn = false; // Ensure logged-in status is false
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload; // Update state with fetched user details
        localStorage.setItem('user', JSON.stringify(action.payload)); // Store complete user details
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
