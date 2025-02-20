import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import PullToRefresh from 'react-pull-to-refresh';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Layout from '../components/Layout';
import AddSongModal from '../components/AddSongModal';
import TableTrackItem from '../components/TableTrackItem';
import MobileTrackItem from '../components/MobileTrackItem';
import { getUserSavedTracks, removeUserSavedTrack, saveUserTrack } from '../services/spotifyApi';
import { Track } from '../types';

const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const SavedTracksPage: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchTracks = async (): Promise<void> => {
    setRefreshing(true);
    try {
      const data = await getUserSavedTracks(true);
      const formatted = data.items.map((item: any) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        albumArt: item.track.album.images[0]?.url,
        addedAt: new Date(item.added_at).toLocaleDateString(),
        duration: formatDuration(item.track.duration_ms)
      }));
      setTracks(formatted);
      setFilteredTracks(formatted);
    } catch (error) {
      console.error('Failed to load saved tracks', error);
      toast.error('Failed to load saved tracks');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchTracks(); }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = tracks.filter(
        track =>
          track.title.toLowerCase().includes(lowerQuery) ||
          track.artist.toLowerCase().includes(lowerQuery)
      );
      setFilteredTracks(filtered);
    }
  }, [searchQuery, tracks]);

  const handleRemove = async (trackId: string) => {
    const trackToRemove = tracks.find(t => t.id === trackId);
    if (!trackToRemove) return;
    setTracks(prev => prev.filter(t => t.id !== trackId));
    setFilteredTracks(prev => prev.filter(t => t.id !== trackId));
    try {
      await removeUserSavedTrack(trackId);
      toast.info(({ closeToast }: { closeToast: () => void }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography>Removed "{trackToRemove.title}"</Typography>
          <Button variant="contained" onClick={() => { undoRemoval(trackToRemove); closeToast(); }}>
            Undo
          </Button>
        </Box>
      ), { autoClose: 15000, style: { width: '100%', minWidth: '400px' } });
    } catch (error) {
      console.error('Error removing track', error);
      toast.error('Error removing track');
    }
  };

  const undoRemoval = async (track: Track) => {
    try {
      await saveUserTrack(track.id);
      setTracks(prev => [track, ...prev]);
      setFilteredTracks(prev => [track, ...prev]);
      toast.success(`Re-added "${track.title}"`);
    } catch (error) {
      console.error('Error re-adding track', error);
      toast.error('Error re-adding track');
    }
  };

  const handleSongAdded = (newTrack: Track) => {
    setTracks(prev => [newTrack, ...prev]);
    setFilteredTracks(prev => [newTrack, ...prev]);
  };

  const renderTableView = () => (
    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="saved tracks table">
        <TableHead>
          <TableRow sx={{ display: 'grid', gridTemplateColumns: '0.13fr 1fr 0.7fr 0.5fr 0.4fr', alignItems: 'left' }}>
            <TableCell sx={{ p: 1, color: '#b3b3b3', fontWeight: 'bold' }} />
            <TableCell sx={{ p: 1, color: 'white', fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ p: 1, color: '#b3b3b3', fontWeight: 'bold' }}>Album</TableCell>
            <TableCell sx={{ p: 1, color: '#b3b3b3', fontWeight: 'bold' }}>Date Added</TableCell>
            <TableCell sx={{ p: 1, color: '#b3b3b3', fontWeight: 'bold', textAlign: 'right' }}>
              <AccessTimeIcon />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {filteredTracks.map(track => (
              <TableTrackItem key={track.id} {...track} onRemove={handleRemove} />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderListView = () => (
    <AnimatePresence>
      {filteredTracks.map(track => (
        <MobileTrackItem key={track.id} id={track.id} title={track.title} artist={track.artist} albumArt={track.albumArt} onRemove={handleRemove} />
      ))}
    </AnimatePresence>
  );

  return (
    <Layout>
      <PullToRefresh onRefresh={(fetchTracks)}>
        <Box sx={{ p: 2 }}>
          {isMobile ? (
            <>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
                Saved Tracks
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search by title or artist"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: '#282828',
                  borderRadius: 1,
                  '& .MuiInputBase-input': { color: 'white' },
                  width: 300,
                  mb: 2
                }}
              />
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                Saved Tracks
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search by title or artist"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: '#282828',
                  borderRadius: 1,
                  '& .MuiInputBase-input': { color: 'white' },
                  width: 300
                }}
              />
            </Box>
          )}
          {refreshing && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {!refreshing && (
            <>
              {isMobile ? renderListView() : renderTableView()}
            </>
          )}
        </Box>
      </PullToRefresh>
      <Fab
        aria-label="add"
        onClick={() => setIsModalOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 32, backgroundColor: '#1ed760' }}
      >
        <AddIcon />
      </Fab>
      <AddSongModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSongAdded={handleSongAdded}
        existingTrackIds={tracks.map(track => track.id)}
      />
    </Layout>
  );
};

export default SavedTracksPage;
