import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Grid, Button, Typography } from '@mui/material';

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  product: string;
  country: string;
  email: string;
  id: string;
  followers: { total: number };
  external_urls: { spotify: string };
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('user_profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#121212',
          borderRadius: 2,
          color: '#FFFFFF'
        }
      }}
    >
      {profile ? (
        <>
          <DialogTitle sx={{ backgroundColor: '#121212', color: 'white', p: 2 }}>
            {profile.display_name}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#121212', color: 'white', pt: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {profile.images && profile.images[0] && (
                <Box
                  component="img"
                  src={profile.images[0].url}
                  alt={profile.display_name}
                  sx={{ height: 200, width: '100%', objectFit: 'cover', borderRadius: 2 }}
                />
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Email:
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {profile.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Status:
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {profile.product}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Country:
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {profile.country}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Followers:
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {profile.followers.total}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1ED760', color: 'white' }}
                href={profile.external_urls.spotify}
                target="_blank"
                rel="noopener"
              >
                View on Spotify
              </Button>
            </Box>
          </DialogContent>
        </>
      ) : (
        <DialogContent>
          <Typography sx={{ color: 'white' }}>
            No profile data found. Please log in again.
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ProfileModal;
