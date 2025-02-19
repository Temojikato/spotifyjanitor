import React from 'react';
import { redirectToSpotifyAuth } from '../services/auth';
import { Box, Typography, Button } from '@mui/material';

const LoginPage: React.FC = () => {
  const handleLogin = async () => {
    try {
      await redirectToSpotifyAuth();
    } catch (error) {
      console.error("Error during Spotify authentication", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Spotify Janitor
      </Typography>
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          backgroundColor: '#1ED760',
          color: 'white',
          fontSize: '1rem',
          padding: '12px 24px',
          borderRadius: 2,
          '&:hover': { backgroundColor: '#1ac74d' },
        }}
      >
        Login with Spotify
      </Button>
    </Box>
  );
};

export default LoginPage;
