import React from 'react';
import { Button, Box, Typography } from '@mui/material';

interface UndoToastProps {
  trackTitle: string;
  onUndo: () => void;
  closeToast?: () => void;
}

const UndoToast: React.FC<UndoToastProps> = ({ trackTitle, onUndo, closeToast }) => {
  const handleUndoClick = () => {
    onUndo();
    if (closeToast) closeToast();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: 'black',
      }}
    >
      <Typography variant="body1" sx={{ marginRight: 2 }}>
        Removed "{trackTitle}"
      </Typography>
      <Button variant="contained" color="primary" onClick={handleUndoClick}>
        Undo
      </Button>
    </Box>
  );
};

export default UndoToast;
