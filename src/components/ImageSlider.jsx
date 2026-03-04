import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, Container, Paper, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const sliderImages = [
  {
    id: 1,
    image: 'https://img.freepik.com/free-photo/techno-party-lifestyle_52683-122049.jpg?semt=ais_hybrid&w=740',
    title: 'Dance & Music Events',
    subtitle: 'Find the best DJs and sound systems in Tirupattur for your parties',
    cta: 'Find DJs',
    link: '/services/music'
  },
  {
    id: 2,
    image: 'https://media.istockphoto.com/id/650654722/photo/catering-food-wedding-event-table.jpg?s=612x612&w=0&k=20&c=HvC2GTokOPgpseoCEhudgKTyTa4rRKvOpMACeE4Qxps=',
    title: 'Premium Catering Services',
    subtitle: 'Delicious food and professional service for all your celebrations',
    cta: 'Book Catering',
    link: '/services/catering'
  },
  {
    id: 3,
    image: 'https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg',
    title: 'Professional Photography',
    subtitle: 'Capture your special moments with our expert photographers',
    cta: 'Hire Photographers',
    link: '/services/photography'
  }
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const ImageSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoSlide, setAutoSlide] = useState(true);
  
  const imageIndex = Math.abs(page % sliderImages.length);

  const paginate = useCallback((newDirection) => {
    setAutoSlide(false);
    setPage([page + newDirection, newDirection]);
    
    // Resume auto sliding after manual navigation
    setTimeout(() => setAutoSlide(true), 5000);
  }, [page]);

  useEffect(() => {
    if (!autoSlide) return;
    
    const interval = setInterval(() => {
      setPage([page + 1, 1]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [page, autoSlide]);

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden', 
      height: { xs: '40vh', sm: '45vh', md: '55vh' },
      '&:hover .MuiIconButton-root': { opacity: 0.8 },
      borderRadius: { xs: 0, md: '0 0 16px 16px' },
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      mb: 4
    }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${sliderImages[imageIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                zIndex: 1
              }
            }}
          >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ 
                bgcolor: 'transparent',
                textAlign: 'center',
                p: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    color="white" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      letterSpacing: '-0.5px',
                      lineHeight: 1.2
                    }}
                  >
                    {sliderImages[imageIndex].title}
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Typography 
                    variant="h5" 
                    color="white" 
                    sx={{ 
                      mt: 1,
                      mb: 3,
                      fontWeight: 400,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      fontSize: { xs: '0.875rem', sm: '1.1rem', md: '1.25rem' },
                      maxWidth: '700px',
                      mx: 'auto'
                    }}
                  >
                    {sliderImages[imageIndex].subtitle}
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    component={Link}
                    to={sliderImages[imageIndex].link}
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 1,
                      px: 3,
                      py: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '50px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {sliderImages[imageIndex].cta}
                  </Button>
                </motion.div>
              </Box>
            </Container>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <IconButton
        onClick={() => paginate(-1)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: 8, md: 16 },
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.3)',
          color: 'white',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
          opacity: { xs: 0.8, md: 0 },
          transition: 'opacity 0.3s',
          zIndex: 2
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      
      <IconButton
        onClick={() => paginate(1)}
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: 8, md: 16 },
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.3)',
          color: 'white',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
          opacity: { xs: 0.8, md: 0 },
          transition: 'opacity 0.3s',
          zIndex: 2
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Slide indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          zIndex: 2
        }}
      >
        {sliderImages.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: i === imageIndex ? 1.1 : 1,
              opacity: i === imageIndex ? 1 : 0.6
            }}
            transition={{ duration: 0.3 }}
          >
            <Box
              onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
              sx={{
                width: i === imageIndex ? 30 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === imageIndex ? 'primary.main' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: i === imageIndex ? 'primary.main' : 'rgba(255,255,255,0.9)',
                }
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
