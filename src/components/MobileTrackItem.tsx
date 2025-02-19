import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

interface MobileTrackItemProps {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  onRemove: (id: string) => void;
}

const MobileTrackItem: React.FC<MobileTrackItemProps> = ({ id, title, artist, albumArt, onRemove }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    const handleResize = () => { if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const threshold = containerWidth * 0.5;
  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (e.deltaX > 0) {
        e.event?.preventDefault();
        setSwipeDelta(e.deltaX);
      }
    },
    onSwiped: (e) => {
      if (e.deltaX >= threshold) onRemove(id);
      setSwipeDelta(0);
    },
    trackMouse: true,
    delta: 10
  });

  return (
    <Box ref={containerRef} sx={{ position: 'relative', mb: 2 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ff3b30',
          borderRadius: 2,
          display: swipeDelta > 20 ? 'flex' : 'none',
          alignItems: 'center',
          pl: 2,
          zIndex: 0
        }}
      >
        <DeleteIcon sx={{ color: 'white' }} />
      </Box>
      <motion.div
        {...handlers}
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: swipeDelta, opacity: 1 }}
        transition={{ type: 'tween' }}
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 8,
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#121212'
        }}
      >
        <Box
          component="img"
          src={albumArt}
          alt={title}
          sx={{ width: 50, height: 50, mr: 2, borderRadius: '50%' }}
        />
        <Box>
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>{title}</Typography>
          <Typography variant="body2" sx={{ m: 0, color: '#b3b3b3' }}>{artist}</Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default MobileTrackItem;
