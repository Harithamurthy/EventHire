import { Box, Container, Typography, TextField, InputAdornment, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

// Styled hero section
const HeroWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random/?tirupattur,event)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
}));

const HeroSection = () => {
  return (
    <HeroWrapper>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
            Find Local Event Services in Tirupattur
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
            Connect with photographers, caterers, DJs, and more for your next event
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              p: 1,
              borderRadius: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="What service do you need?"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4, px: 1 }
              }}
              variant="standard"
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link}
              to="/post-event"
              sx={{ 
                mr: 2, 
                px: 4, 
                py: 1.5, 
                bgcolor: '#1976d2',
                '&:hover': {
                  bgcolor: '#115293',
                }
              }}
            >
              Post Event Need
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link}
              to="/find-events"
              sx={{ 
                px: 4, 
                py: 1.5, 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Find Events
            </Button>
          </Box>
        </motion.div>
      </Container>
    </HeroWrapper>
  );
};

export default HeroSection;
