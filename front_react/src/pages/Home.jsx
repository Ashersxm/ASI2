import React, { useEffect } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import Header from './Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../app/userSlice'; // Ajustez le chemin si nécessaire

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users); // Logs the list of users once they are fetched

  return (
    <div>
      <Header />
      {/* Main Content */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {/* Sell Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                href="/card/SellPage"
                startIcon={<SellIcon />}
                size="large"
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'none',
                }}
              >
                Sell
              </Button>
            </Grid>

            {/* Buy Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                href="/card/BuyPage"
                startIcon={<ShoppingCartIcon />}
                size="large"
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'none',
                }}
              >
                Buy
              </Button>
            </Grid>

            {/* Create Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                href="./forms/formCardCreation"
                startIcon={<ScienceIcon />}
                size="large"
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'none',
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
