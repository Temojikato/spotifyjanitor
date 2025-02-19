import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { searchTracks, saveUserTrack } from '../services/spotifyApi';
import { Track } from '../types';

interface AddSongModalProps {
  open: boolean;
  onClose: () => void;
  onSongAdded: (track: Track) => void;
  existingTrackIds: string[];
}

const AddSongModal: React.FC<AddSongModalProps> = ({ open, onClose, onSongAdded, existingTrackIds }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const data = await searchTracks(query);
      const formatted = data.tracks.items.map((item: any) => ({
        id: item.id,
        title: item.name,
        artist: item.artists[0].name,
        albumArt: item.album.images[0]?.url,
        album: item.album.name || '',
        addedAt: '',
        duration: ''
      }));
      setResults(formatted);
    } catch (error) {
      console.error(error);
      toast.error('Error searching tracks');
    }
  };

  const handleAdd = async (track: Track) => {
    try {
      await saveUserTrack(track.id);
      onSongAdded(track);
      toast.success(`Added "${track.title}"`);
    } catch (error) {
      console.error(error);
      toast.error('Error adding track');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#121212',
          borderRadius: 2,
          color: '#FFFFFF'
        }
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          backgroundColor: '#121212',
          p: 2
        }}
      >
        Add a Song
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, mt: 2, mb: 2 }}>
          <TextField
            autoFocus
            label="Search for a song"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') handleSearch();
            }}
            InputLabelProps={{
              sx: {
                color: 'white',
                '&.Mui-focused': { color: 'white' }
              }
            }}
            sx={{
              backgroundColor: '#282828',
              borderRadius: 1,
              width: 300,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1ED760',
                  boxShadow: '0 0 8px 2px rgba(30,215,96,0.5)'
                }
              },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              mt: '1rem',
              backgroundColor: '#1ED760',
              color: 'white',
              '&:hover': { backgroundColor: '#1cc653' }
            }}
          >
            Search
          </Button>
        </Box>
        <List>
          {results.map((track) => {
            const alreadySaved = existingTrackIds.includes(track.id);
            return (
              <ListItem
                key={track.id}
                secondaryAction={
                  <Button
                    variant="contained"
                    disabled={alreadySaved}
                    onClick={() => handleAdd(track)}
                    sx={{
                      backgroundColor: '#1ED760',
                      '&.Mui-disabled': { backgroundColor: '#24472d' }
                    }}
                  >
                    {alreadySaved ? 'Saved' : 'Add'}
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src={track.albumArt} alt={track.title} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>{track.title}</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#b3b3b3' }}>{track.artist}</Typography>}
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          p: 2
        }}
      >
        <Button onClick={onClose} sx={{ color: 'white' }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSongModal;