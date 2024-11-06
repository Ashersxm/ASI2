import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Checkbox, FormControlLabel, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../app/userSlice'; // Adjust the import based on your file structure
import Header from '../Header';

const FormUser = () => {
  const dispatch = useDispatch();
  const [termsChecked, setTermsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    login: '',
    surName: '',
    lastName: '',
    pwd: '',
    rePwd: '',
    email: ''
  });

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.pwd !== formData.rePwd) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!termsChecked) {
      setErrorMessage('Please agree to the terms and conditions.');
      return;
    }

    // Clear error message and dispatch registration action
    setErrorMessage('');
    dispatch(registerUser(formData));
    console.log('Form submitted!', formData);
  };

  return (
    <div>
      <Header />
      <Container>
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  label="Login"
                  variant="outlined"
                  fullWidth
                  required
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder="Login"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Surname"
                  variant="outlined"
                  fullWidth
                  required
                  name="surName"
                  value={formData.surName}
                  onChange={handleInputChange}
                  placeholder="Surname"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  type="email"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  name="pwd"
                  value={formData.pwd}
                  onChange={handleInputChange}
                  placeholder="Your Password"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Re-Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  name="rePwd"
                  value={formData.rePwd}
                  onChange={handleInputChange}
                  placeholder="Your Password Again"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={<Checkbox checked={termsChecked} onChange={handleCheckboxChange} />}
                  label="I agree to the Terms and Conditions"
                />
              </Box>
              {errorMessage && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={!termsChecked}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default FormUser;
