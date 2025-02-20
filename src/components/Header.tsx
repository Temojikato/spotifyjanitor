import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Menu, MenuItem, Typography, Avatar, Box, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const excludedPaths = ['/', '/login', '/saved-tracks'];
  const showBackArrow = isMobile && !excludedPaths.includes(location.pathname);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfile = () => { handleMenuClose(); setProfileModalOpen(true); };
  const handleLogout = () => { handleMenuClose(); localStorage.removeItem('access_token'); localStorage.removeItem('code_verifier'); localStorage.removeItem('profile_pic'); navigate('/'); };
  const handleBack = () => navigate(-1);
  const handleTitleClick = () => navigate('/');
  const profilePicUrl = localStorage.getItem('profile_pic') || '/default-avatar.png';

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#000',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ fontFamily: 'Roboto, sans-serif' }}>
        {showBackArrow && (
          <IconButton aria-label="Back" onClick={handleBack} color="inherit" sx={{ mr: 1 }}>
            <ArrowBackIcon aria-hidden="true" data-testid="ArrowBackIcon"/>
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            component="img"
            src="/Spotify.png"
            alt="Spotify Logo"
            onClick={handleTitleClick}
            sx={{ height: 32, width: 32, mr: 1, cursor: 'pointer' }}
          />
          <Typography variant="h6" onClick={handleTitleClick} sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Janitor
          </Typography>
        </Box>
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar src={profilePicUrl} alt="Profile" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      <ProfileModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </AppBar>
  );
};

export default Header;
