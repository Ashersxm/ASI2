import React, { useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Grid, Container } from '@mui/material';
import Header from './Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../app/userSlice'; // Adjust the path as needed

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users); // Logs the list of users once they are fetched

  return (
    <div>
      <Header />
      {/* Main Content */}
      <Container>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="/card/SellPage"
              startIcon={<SellIcon />}
              size="large"
            >
              Sell
            </Button>
          </Grid>
          <Grid xs={12} sm={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/card/BuyPage"
              startIcon={<ShoppingCartIcon />}
              size="large"
            >
              Buy
            </Button>
          </Grid>
          <Grid xs={12} sm={4}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              href="./forms/formCardCreation"
              startIcon={<ScienceIcon />}
              size="large"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
