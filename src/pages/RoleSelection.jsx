import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, updateRole, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is not authenticated, redirect to login with a message
    if (!isAuthenticated) {
      // Store the intended destination to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/role-selection');
      navigate('/login');
      return;
    }
    
    // If user already has a role, redirect to appropriate dashboard
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'organizer') {
      navigate('/organizer-dashboard');
    } else if (userRole === 'provider') {
      navigate('/provider-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRoleSelection = async (role) => {
    setLoading(true);
    setError('');
    
    try {
      // Update role in the database
      await updateRole(role);
      
      // Navigate based on role
      if (role === 'organizer') {
        navigate('/organizer-dashboard');
      } else {
        navigate('/provider-dashboard');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to EventHire!
          </Typography>
          <Typography variant="h5" color="text.secondary">
            How would you like to use our platform?
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => handleRoleSelection('organizer')}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '8px', 
                    bgcolor: '#1976d2' 
                  }} 
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: '50%',
                      p: 2,
                      mr: 2
                    }}
                  >
                    <EventIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                  </Box>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                    Event Organizer
                  </Typography>
                </Box>
                
                <Typography variant="h6" paragraph sx={{ mb: 3 }}>
                  I need to hire professionals for my events
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Post events and find service providers
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Review applications from professionals
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Manage your events and bookings
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Rate and review service providers
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => handleRoleSelection('organizer')}
                  disabled={loading}
                  sx={{ 
                    mt: 'auto', 
                    py: 1.5, 
                    borderRadius: 2,
                    bgcolor: '#1976d2',
                    '&:hover': {
                      bgcolor: '#115293',
                    },
                    fontWeight: 600
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue as Organizer'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => handleRoleSelection('provider')}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '8px', 
                    bgcolor: '#9c27b0' 
                  }} 
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(156, 39, 176, 0.1)',
                      borderRadius: '50%',
                      p: 2,
                      mr: 2
                    }}
                  >
                    <WorkIcon sx={{ fontSize: 50, color: '#9c27b0' }} />
                  </Box>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                    Service Provider
                  </Typography>
                </Box>
                
                <Typography variant="h6" paragraph sx={{ mb: 3 }}>
                  I want to offer my services for events
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Find event opportunities in your area
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Apply to events that match your skills
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Showcase your portfolio and experience
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Manage your bookings and schedule
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => handleRoleSelection('provider')}
                  disabled={loading}
                  sx={{ 
                    mt: 'auto', 
                    py: 1.5, 
                    borderRadius: 2,
                    bgcolor: '#9c27b0',
                    '&:hover': {
                      bgcolor: '#7b1fa2',
                    },
                    fontWeight: 600
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue as Provider'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Don't worry, you can always change your role later from your profile settings.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default RoleSelection;
