import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Checkbox, FormControlLabel, Container, Grid2, Box } from '@mui/material';
import Header from '../Header';
const FormUser = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (termsChecked) {
      // Process form data
      console.log('Form submitted!');
    } else {
      console.log('Please agree to the terms and conditions.');
    }
  };

  return (
    <div>
      <Header></Header>

      {/* Form Content */}
      <Container>
        <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
          <Grid2 item xs={12} sm={8} md={6}>
            <form>
              <Box mb={2}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="First Name"
                />
              </Box>

              <Box mb={2}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Last Name"
                />
              </Box>

              <Box mb={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
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
                  placeholder="Your Password Again"
                />
              </Box>

              {/* Checkbox */}
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox checked={termsChecked} onChange={handleCheckboxChange} />
                  }
                  label="I agree to the Terms and Conditions"
                />
              </Box>

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
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
