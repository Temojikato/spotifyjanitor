import React, { useEffect, useRef, useState } from 'react';
import { TableRow, TableCell, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import DeleteIcon from '@mui/icons-material/Delete';
import { Track } from '../types';

interface TableTrackItemProps extends Track {
  onRemove: (id: string) => void;
}

const TableTrackItem: React.FC<TableTrackItemProps> = ({
  id,
  title,
  artist,
  album,
  albumArt,
  addedAt,
  duration,
  onRemove,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const threshold = containerWidth * 0.5;

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (e.deltaX > 0) setSwipeDelta(e.deltaX);
    },
    onSwiped: (e) => {
      if (e.deltaX >= threshold) onRemove(id);
      setSwipeDelta(0);
    },
    trackMouse: true,
    delta: 10,
  });

  return (
    <TableRow sx={{ position: 'relative', border: 'none' }}>
      <TableCell
        component="td"
        {...{ colSpan: 5 }}
        sx={{ p: 0, m: 0, position: 'relative', overflow: 'hidden', border: 'none' }}
      >
        <Box sx={{ mb: 2 }}>
          <div data-testid="container-div" ref={containerRef} style={{ position: 'relative', width: '100%', height: '72px' }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: swipeDelta > 20 ? swipeDelta : 0,
                backgroundColor: '#ff3b30',
                display: swipeDelta > 20 ? 'grid' : 'none',
                alignItems: 'center',
                pl: '2vw',
                pt: '3vh',
                pb: '6vh',
                zIndex: 0,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              <DeleteIcon sx={{ color: 'white' }} />
            </Box>
            <motion.div
              {...handlers}
              initial={{ x: 0 }}
              animate={{ x: swipeDelta }}
              transition={{ type: 'tween' }}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                backgroundColor: '#121212',
                borderRadius: 8,
                boxSizing: 'border-box',
                padding: '12px 16px',
                display: 'grid',
                gridTemplateColumns: '0.13fr 1fr 0.7fr 0.5fr 0.5fr',
                alignItems: 'center',
                marginTop: '1vh'
              }}
            >
              <Box>
                <Box
                  component="img"
                  src={albumArt}
                  alt={title}
                  sx={{ height: 60, width: 60, objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ ml: '1vw' }}>
                <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem', pl: '0.7vw' }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b3b3b3', fontSize: '0.875rem', pl: '0.7vw' }}>
                  {artist}
                </Typography>
              </Box>
              <Box sx={{ ml: '2vw' }}>
                <Typography variant="body2" sx={{ color: '#b3b3b3', fontSize: '0.875rem' }}>
                  {album}
                </Typography>
              </Box>
              <Box sx={{ ml: '2vw' }}>
                <Typography variant="body2" sx={{ color: '#b3b3b3', fontSize: '0.875rem' }}>
                  {addedAt}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ color: '#b3b3b3', fontSize: '0.875rem' }}>
                  {duration}
                </Typography>
              </Box>
            </motion.div>
          </div>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableTrackItem;
