import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserDetails, logout } from '../../app/userSlice';
import Header from '../Header';

const LoginUser = () => {
  const dispatch = useDispatch();
  const { error, success, userId, isLoggedIn, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    login: '',
    pwd: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (success && userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [success, userId, dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Header />
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        {isLoggedIn ? `Vous êtes déja connecté, ${user?.login || 'User'}!` : 'User Login'}
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {isLoggedIn ? (
        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField 
              fullWidth 
              label="Login" 
              name="login" 
              placeholder="Your Login" 
              variant="outlined" 
              required 
              value={formData.login}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              name="pwd" 
              placeholder="Your Password" 
              variant="outlined" 
              required 
              value={formData.pwd}
              onChange={handleInputChange}
            />
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Login
          </Button>
        </form>
      )}
    </Box>
  );
};

export default LoginUser;
