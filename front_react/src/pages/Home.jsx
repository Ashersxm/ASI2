import React, { useEffect } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import Header from './Header';
import Chat from './Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ScienceIcon from '@mui/icons-material/Science';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../app/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users);

  const user = useSelector(state => state.user);
  console.log(user);

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Colonne de gauche pour le Chat */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 2,
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Chat username={user?.user?.surName} />
            </Box>
          </Grid>

          {/* Colonne de droite pour le contenu principal */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
