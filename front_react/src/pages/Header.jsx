import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/Money';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="header-container">
      {/* AppBar for header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* Left side: Home title with icon and link */}
          <IconButton edge="start" color="inherit" aria-label="home" href="/Home">
            <HomeIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">
              Home
            </Typography>

            {/* "Select your action" in gray */}
            <Typography variant="subtitle2" color="textSecondary">
              Select your action
            </Typography>
          </Box>

          {/* Right side: User info */}
          <div style={{ marginLeft: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" href="/forms/formUser">
                <AddIcon />
              </IconButton>

              {/* Username and Balance */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                {isLoggedIn ? (
                  <>
                    <Typography variant="body1">
                      {user?.surName} {user?.lastName}
                    </Typography>
                    <Typography variant="subtitle2">
                    {user?.account}$
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">
                    Default UserName
                  </Typography>
                )}
              </Box>

              <IconButton color="inherit" href="/forms/loginUser">
                <PersonIcon />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
