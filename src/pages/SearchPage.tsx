import React, { useState } from 'react';
import { searchTracks, saveUserTrack } from '../services/spotifyApi';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const data = await searchTracks(query);
      const formatted = data.tracks.items.map((item: any) => ({
        id: item.id,
        title: item.name,
        artist: item.artists[0].name,
        albumArt: item.album.images[0]?.url,
      }));
      setResults(formatted);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Search failed, please try again.');
    }
  };

  const handleFavorite = async (trackId: string) => {
    try {
      await saveUserTrack(trackId);
      setMessage('Track saved to your favorites!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to save track.');
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Search Spotify Library
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search by title or artist"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          sx={{
            backgroundColor: '#282828',
            borderRadius: 1,
            input: { color: 'white' },
            flex: 1,
          }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ backgroundColor: '#1ED760' }}>
          Search
        </Button>
      </Box>
      {message && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <Box>
        {results.map(track => (
          <Box
            key={track.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 1,
              backgroundColor: '#1e1e1e',
              borderRadius: 2,
            }}
          >
            <Box
              component="img"
              src={track.albumArt}
              alt={track.title}
              sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {track.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                {track.artist}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => handleFavorite(track.id)}
              sx={{ ml: 'auto', backgroundColor: '#1ED760' }}
            >
              Favorite
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
