import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia,
  CardActionArea, TextField, InputAdornment, Divider, Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for services
const serviceCategories = [
  {
    id: 1,
    title: 'Photography',
    description: 'Professional photographers for weddings, events, and portraits',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 12,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Videography',
    description: 'Skilled videographers for capturing your special moments',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', // Added/updated image
    providers: 8,
    rating: 4.7
  },
  {
    id: 3,
    title: 'Catering',
    description: 'Delicious food and beverage services for all types of events',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 15,
    rating: 4.6
  },
  {
    id: 4,
    title: 'Music & DJ',
    description: 'Entertainment services to make your event memorable',
    image: 'https://img.freepik.com/free-photo/techno-party-lifestyle_52683-122049.jpg?w=200&h=120&semt=ais_hybrid',
    providers: 10,
    rating: 4.5
  },
  {
    id: 5,
    title: 'Decoration',
    description: 'Creative decoration services for all occasions',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 7,
    rating: 4.7
  },
  {
    id: 6,
    title: 'Event Planning',
    description: 'End-to-end event planning and coordination services',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 5,
    rating: 4.9
  },
  {
    id: 7,
    title: 'Sound & Lighting',
    description: 'Professional sound and lighting setup for events',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 6,
    rating: 4.6
  },
  {
    id: 8,
    title: 'Venues',
    description: 'Beautiful venues and spaces for hosting your events',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    providers: 9,
    rating: 4.4
  }
];

const ServicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  
  // Filter services based on search term
  const filteredServices = serviceCategories.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Animation variants for card click
  const expandCardVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const handleServiceClick = (id, e) => {
    e.preventDefault();
    setSelectedId(id);
    
    // Add animation delay before navigation
    setTimeout(() => {
      navigate(`/services/${id}`);
    }, 300);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #9c27b0 0%, #ce93d8 100%)',
          color: 'white', 
          py: 3, 
          mb: 3
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Services
          </Typography>
          <Typography variant="subtitle1" align="center" paragraph sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)', mb: 2 }}>
            Find the perfect service providers in Tirupattur for your next event
          </Typography>
          
          <Box sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for services..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'rgba(255, 255, 255, 0.15)', 
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  color: 'white',
                  caretColor: 'white',
                  '& ::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    opacity: 1
                  }
                }
              }}
            />
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={2} alignItems="stretch" justifyContent="center" sx={{ mb: 4 }}>
          <AnimatePresence mode="wait">
            {filteredServices.map((service, index) => {
              // Check if this item is in the 3rd row (indices 4-5 for a 2-card layout)
              const isThirdRow = Math.floor(index / 2) === 2;
              const mdSize = isThirdRow ? 6 : 3;
              
              return (
                <Grid item xs={6} sm={4} md={mdSize} key={service.id} sx={{ display: 'flex' }}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate={selectedId === service.id ? "exit" : "visible"}
                    exit="exit"
                    variants={cardVariants}
                    layout
                    style={{ height: '100%', width: '100%' }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: '0.3s',
                        boxShadow: 1,
                        borderRadius: '8px',
                        maxWidth: '280px',
                        mx: 'auto',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        },
                        '&:hover::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(206, 147, 216, 0.1) 100%)',
                          pointerEvents: 'none'
                        }
                      }}
                    >
                      <CardActionArea 
                        component={Link} 
                        to={`/services/${service.id}`}
                        onClick={(e) => handleServiceClick(service.id, e)}
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                      >
                        <Box sx={{ 
                          height: '70px', 
                          overflow: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          bgcolor: '#f5f5f5',
                          p: 0.5
                        }}>
                          <CardMedia
                            component="img"
                            image={service.image}
                            alt={service.title}
                            sx={{ 
                              width: 'auto',
                              maxWidth: '100px',
                              height: '60px',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              borderRadius: '4px'
                            }}
                          />
                        </Box>
                        <CardContent sx={{ 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'space-between', 
                          px: 1.5, 
                          pt: 1, 
                          pb: 0.75 
                        }}>
                          <Box>
                            <Typography variant="subtitle1" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.95rem', mb: 0.5 }}>
                              {service.title}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, height: '2.1rem', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {service.description}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Divider sx={{ my: 1 }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                              <Chip 
                                icon={<PeopleIcon fontSize="small" />} 
                                label={`${service.providers}`} 
                                size="small"
                                variant="outlined"
                                sx={{ height: '20px', '& .MuiChip-label': { fontSize: '0.7rem', px: 0.5 }, '& .MuiChip-icon': { fontSize: '0.9rem' } }}
                              />
                              
                              <Chip 
                                icon={<StarIcon fontSize="small" />} 
                                label={service.rating.toFixed(1)} 
                                size="small"
                                color="primary"
                                sx={{ height: '20px', '& .MuiChip-label': { fontSize: '0.7rem', px: 0.5 }, '& .MuiChip-icon': { fontSize: '0.9rem' } }}
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
        
        {/* Clicked card overlay animation */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }
                }}
                exit={{ scale: 0 }}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear'
                    }
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid #f0f0f0',
                    borderTop: '3px solid #9c27b0'
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {filteredServices.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4, py: .4 }}>
            <Typography variant="h6" gutterBottom>
              No services found matching "{searchTerm}"
            </Typography>
            <Typography color="text.secondary">
              Try a different search term or browse all categories above.
            </Typography>
          </Box>
        )}
      </Container>
    </motion.div>
  );
};

export default ServicesList;
