// src/pages/LoginUser.jsx
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Header from '../Header';

const LoginUser = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Logique de connexion ici
    console.log('Login process initiated');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Header></Header>

      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Add an user
      </Typography>

      {/* Formulaire de connexion */}
      <form onSubmit={handleLogin}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField 
            fullWidth 
            label="First Name" 
            name="login" 
            placeholder="Login" 
            variant="outlined" 
            required 
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            name="password" 
            placeholder="Your Password" 
            variant="outlined" 
            required 
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
    </Box>
  );
};

export default LoginUser;
