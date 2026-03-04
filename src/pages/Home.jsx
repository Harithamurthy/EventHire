import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Card, CardContent, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ImageSlider from '../components/ImageSlider';
import ServiceCard from '../components/ServiceCard';
// Import AnimatePresence and motion for possible extra effects
import { AnimatePresence } from 'framer-motion';
import FeaturedEventCard from '../components/FeaturedEventCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // Mock data for featured events
  const featuredEvents = [
    {
      id: 1,
      title: 'Wedding Photography Needed',
      location: 'Jolarpet, Tirupattur',
      date: 'May 15, 2025',
      category: 'Photography',
      image: 'https://source.unsplash.com/random/?wedding',
    },
    {
      id: 2,
      title: 'Birthday Party Catering',
      location: 'Vaniyambadi, Tirupattur',
      date: 'May 20, 2025',
      category: 'Catering',
      image: 'https://source.unsplash.com/random/?catering',
    },
    {
      id: 3,
      title: 'College Fest DJ Required',
      location: 'Tirupattur Town',
      date: 'June 5, 2025',
      category: 'Music',
      image: 'https://source.unsplash.com/random/?dj',
    },
  ];

  // Service categories
  const services = [
    {
      title: 'Photography',
      icon: <CameraAltIcon sx={{ fontSize: 60, color: '#1976d2' }} />, // icon prop will be wrapped for animation

      description: 'Professional photographers for all your events.',
    },
    {
      title: 'Catering',
      icon: <FastfoodIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      description: 'Delicious food for your parties and celebrations.',
    },
    {
      title: 'Music & DJ',
      icon: <MusicNoteIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      description: 'Set the mood right with our music services.',
    },
    {
      title: 'Event Planning',
      icon: <CelebrationIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      description: 'Complete event planning and coordination.',
    },
  ];

  // Benefits data
  const benefits = [
    {
      title: 'Local Talent',
      description: 'Connect with talented service providers right in Tirupattur district.',
      icon: <LocationOnIcon fontSize="large" sx={{ color: '#1976d2', mb: 1 }} />,
    },
    {
      title: 'Easy Booking',
      description: 'Simple process to post your event needs and connect with providers.',
      icon: <EventIcon fontSize="large" sx={{ color: '#1976d2', mb: 1 }} />,
    },
    {
      title: 'Trusted Community',
      description: 'Join a growing community of verified event professionals and clients.',
      icon: <PeopleIcon fontSize="large" sx={{ color: '#1976d2', mb: 1 }} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f9f9f9' }}>
      {/* Image Slider Section */}
      <ImageSlider />

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
              Our Services
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find the perfect service provider for your next event
            </Typography>
          </Box>
          <Button 
            component={Link} 
            to="/services"
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              color: '#1976d2', 
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' },
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            View All
          </Button>
        </Box>
        
        <Grid 
          container 
          spacing={2}
          justifyContent="center" 
          alignItems="stretch"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </Grid>
      </Container>

      {/* Featured Events Section */}
      <Box sx={{ bgcolor: '#ffffff', py: 4, mb: 5 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
                Featured Events
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Events looking for service providers in Tirupattur
              </Typography>
            </Box>
            <Button 
              component={Link} 
              to="/events"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                color: '#1976d2', 
                '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' },
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {featuredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <FeaturedEventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 4, mb: 5 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
              Why Choose EventHire?
            </Typography>
          </Box>
          
          <Grid container spacing={2} justifyContent="center">
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={4} key={benefit.title}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      border: '1px solid #e0e0e0',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box 
                          sx={{ 
                            bgcolor: index % 2 === 0 ? 'rgba(25, 118, 210, 0.1)' : 'rgba(233, 30, 99, 0.1)', 
                            p: 1, 
                            borderRadius: 1,
                            mr: 1.5
                          }}
                        >
                          {React.cloneElement(benefit.icon, { 
                            fontSize: 'small', 
                            sx: { color: index % 2 === 0 ? '#1976d2' : '#d81b60' } 
                          })}
                        </Box>
                        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, color: index % 2 === 0 ? '#1976d2' : '#d81b60' }}>
                          {benefit.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#555', fontSize: '0.875rem' }}>
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      
      {/* CTA Section */}
      <Box sx={{ bgcolor: '#e3f2fd', py: 4, mb: 0 }}>
        <Container maxWidth="lg">
          <Card elevation={0} sx={{ 
            overflow: 'hidden', 
            borderRadius: 3,
            bgcolor: 'transparent',
            border: 'none'
          }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={7} sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
                  Ready to get started with EventHire?
                </Typography>
                <Typography variant="body2" paragraph sx={{ mb: 3, maxWidth: '90%' }}>
                  Join our community today and discover the best local talent for your events in Tirupattur district.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    variant="contained" 
                    size="medium" 
                    component={Link}
                    to={isAuthenticated ? '/my-events' : '/register'}
                    sx={{ 
                      px: 3, 
                      py: 1,
                      borderRadius: '50px',
                      fontWeight: 600,
                      bgcolor: '#1976d2',
                      '&:hover': {
                        bgcolor: '#115293',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isAuthenticated ? 'My Events' : 'Sign Up Now'}
                  </Button>
                  <Button 
                    variant="contained" 
                    size="medium" 
                    component={Link}
                    to="/go-to-provider"
                    sx={{ 
                      px: 3, 
                      py: 1,
                      borderRadius: '50px',
                      fontWeight: 600,
                      bgcolor: '#9c27b0',
                      '&:hover': {
                        bgcolor: '#7b1fa2',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Service Provider Dashboard
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="medium" 
                    component={Link}
                    to="/how-it-works"
                    sx={{ 
                      px: 3, 
                      py: 1, 
                      borderRadius: '50px',
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#115293',
                        bgcolor: 'rgba(25, 118, 210, 0.04)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Learn How It Works
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    component="img"
                    src="https://source.unsplash.com/random/?event,celebration"
                    alt="EventHire"
                    sx={{
                      width: '100%',
                      borderRadius: { xs: 2, md: '0 8px 8px 0' },
                      height: { xs: 200, md: 250 },
                      objectFit: 'cover',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
