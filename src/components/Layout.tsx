import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      const height = headerRef.current?.offsetHeight || 0;
      setHeaderHeight(height);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box ref={headerRef}>
        <Header />
      </Box>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: 2,
          m: 2,
          p: 2,
          overflowY: 'auto',
          height: `calc(100vh - ${headerHeight}px)`
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
