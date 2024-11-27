import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/userSlice'; // Adjust the import path as needed
import Header from '../Header';

const FormUser = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    login: '',
    surName: '',
    lastName: '',
    pwd: '',
    rePwd: '',
    email: '',
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error'

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.login) errors.login = 'Login is required.';
    if (!formData.surName) errors.surName = 'Surname is required.';
    if (!formData.lastName) errors.lastName = 'Last name is required.';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Please enter a valid email.';
    if (!formData.pwd || formData.pwd.length < 6)
      errors.pwd = 'Password must be at least 6 characters.';
    if (formData.pwd !== formData.rePwd)
      errors.rePwd = 'Passwords do not match.';
    if (!termsChecked) errors.terms = 'You must agree to the terms and conditions.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (success) {
      setSnackbarMessage('User created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (error) {
      setSnackbarMessage(`Error: ${error}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [success, error]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
                  error={!!formErrors.login}
                  helperText={formErrors.login}
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
                  error={!!formErrors.surName}
                  helperText={formErrors.surName}
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
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
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
                  error={!!formErrors.email}
                  helperText={formErrors.email}
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
                  error={!!formErrors.pwd}
                  helperText={formErrors.pwd}
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
                  error={!!formErrors.rePwd}
                  helperText={formErrors.rePwd}
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={<Checkbox checked={termsChecked} onChange={handleCheckboxChange} />}
                  label="I agree to the Terms and Conditions"
                />
                {formErrors.terms && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {formErrors.terms}
                  </Typography>
                )}
              </Box>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormUser;
