import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Checkbox, FormControlLabel, Container, Grid2, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../app/userSlice'; // Adjust the import based on your file structure
import Header from '../Header';

const FormUser = () => {
  const dispatch = useDispatch();
  const [termsChecked, setTermsChecked] = useState(false);
  
  // State for form fields
  const [formData, setFormData] = useState({
    login: '',         // Added login field
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
    if (termsChecked && formData.pwd === formData.rePwd) {
      // Dispatch registration action with form data
      dispatch(registerUser(formData));
      console.log('Form submitted!', formData);
    } else {
      console.log('Please check your inputs.');
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
          <Grid2 item xs={12} sm={8} md={6}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  label="Login"
                  variant="outlined"
                  fullWidth
                  required
                  name="login" // Name updated to match state
                  value={formData.login} // Updated to match state
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
                  value={formData.surName} // Updated to match state
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
                  value={formData.pwd} // Updated to match state
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
                  value={formData.rePwd} // Updated to match state
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
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default FormUser;
