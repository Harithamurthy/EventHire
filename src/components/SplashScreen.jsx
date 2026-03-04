import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import logo from '../assets/images/logo.png.png';
import { motion } from 'framer-motion';

const SplashScreen = ({ onFinished }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (onFinished) onFinished();
    }, 3000); // 3 seconds duration

    return () => clearTimeout(timer);
  }, [onFinished]);

  if (!showSplash) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            sx={{
              width: '180px',
              height: '180px',
              mx: 'auto',
              mb: 2,
              display: 'block',
            }}
            alt="EventHire Logo"
            src={logo}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{ 
              fontWeight: 700, 
              color: '#1976d2',
              mb: 1,
            }}
          >
            EventHire
          </Typography>
          
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ 
              fontWeight: 400, 
              color: '#546e7a',
              fontStyle: 'italic',
            }}
          >
            Connecting Tirupattur events with local talent
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SplashScreen;
