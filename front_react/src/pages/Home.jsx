import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Grid2, Container } from '@mui/material';
import Header from './Header';
import Chat from './Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers } from '@/app/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //console.log(users); // Logs the list of users once they are fetched

  const user = useSelector(state => state.user);
  console.log(user);

  return (
    <div>
      <Header />
      <Container>
        <Grid2 container spacing={3}>
          {/* Chat Content */}
          <Grid2 xs={12} md={3}>
            <Chat username={user?.user?.surName} />
          </Grid2>

          {/* Main Content */}
          <Grid2 xs={12} md={9}>
            <Grid2 container spacing={3} justifyContent="center" alignItems="center">
              <Grid2 xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href="/card/SellPage"
                  startIcon={<SellIcon />}
                  size="large"
                >
                  Vendre
                </Button>
              </Grid2>
              <Grid2 xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  href="/card/BuyPage"
                  startIcon={<ShoppingCartIcon />}
                  size="large"
                >
                  Acheter
                </Button>
              </Grid2>
              <Grid2 xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  href="./forms/formCardCreation"
                  startIcon={<ScienceIcon />}
                  size="large"
                >
                  Créer
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default Home;