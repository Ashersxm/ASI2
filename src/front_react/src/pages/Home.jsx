import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Grid2, Container } from '@mui/material';
import Header from './Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector } from 'react-redux'


const Home = () => {

  const users = useSelector(state => state.user);
  console.log(users)
  return (
    <div>

      <Header></Header>
      {/* Main Content */}
      <Container>
        <Grid2 container spacing={3} justifyContent="center" aligns="center">
          <Grid2  xs={12} sm={4}>
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
          </Grid2>
          <Grid2  xs={12} sm={4}>
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
          </Grid2>
          <Grid2  xs={12} sm={4}>
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
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default Home;
