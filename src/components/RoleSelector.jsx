import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Slide,
  Fade,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoleSelector = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedRole, setSelectedRole] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    
    // Store the user's role preference in localStorage
    localStorage.setItem('userRole', role);
    console.log('Role selected and saved to localStorage:', role);
    
    // Show confetti animation
    setShowConfetti(true);
    
    // Navigate to the appropriate dashboard after a short delay using window.location
    // for more reliable redirection
    setTimeout(() => {
      onClose();
      if (role === 'organizer') {
        console.log('Redirecting to organizer dashboard');
        window.location.href = '/organizer-dashboard';
      } else if (role === 'provider') {
        console.log('Redirecting to provider dashboard');
        window.location.href = '/provider-dashboard';
      }
    }, 1500);
  };

  // Confetti animation component
  const Confetti = () => {
    const confettiColors = ['#1976d2', '#9c27b0', '#4caf50', '#ff9800', '#f44336'];
    
    return (
      <Fade in={showConfetti}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 10,
            overflow: 'hidden'
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const left = Math.random() * 100;
            const animDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            
            return (
              <Box
                key={i}
                component={motion.div}
                sx={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  backgroundColor: color,
                  borderRadius: '2px',
                  top: -20,
                  left: `${left}%`,
                }}
                initial={{ y: -20, rotate: 0 }}
                animate={{
                  y: '100vh',
                  rotate: 360,
                  transition: {
                    duration: animDuration,
                    delay: delay,
                    ease: [0.1, 0.25, 0.3, 1],
                  },
                }}
              />
            );
          })}
        </Box>
      </Fade>
    );
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={fullScreen}
      maxWidth="md"
      onClose={selectedRole ? null : onClose} // Prevent closing if role is selected and animation is playing
      aria-describedby="role-selector-dialog"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative'
        }
      }}
    >
      {showConfetti && <Confetti />}
      
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'center' }}>
          Welcome to EventHire!
        </Typography>
        {!selectedRole && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      <DialogContent sx={{ p: 4 }}>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          Tell us how you'd like to use EventHire today:
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 3,
          justifyContent: 'center',
          alignItems: 'stretch'
        }}>
          {/* Organizer Option */}
          <Paper 
            elevation={selectedRole === 'organizer' ? 12 : 3}
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            sx={{ 
              p: 3, 
              flex: 1, 
              cursor: 'pointer',
              borderRadius: 4,
              border: selectedRole === 'organizer' ? '2px solid #1976d2' : 'none',
              bgcolor: selectedRole === 'organizer' ? 'rgba(25, 118, 210, 0.05)' : 'white',
              maxWidth: 400,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }}
            onClick={() => handleRoleSelect('organizer')}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              height: '100%'
            }}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(25, 118, 210, 0.1)', 
                  borderRadius: '50%', 
                  p: 2,
                  mb: 2
                }}
              >
                <EventIcon sx={{ fontSize: 60, color: '#1976d2' }} />
              </Box>
              
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                I'm an Event Organizer
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                I need to hire professionals for my events
              </Typography>
              
              <Divider sx={{ width: '100%', mb: 3 }} />
              
              <Box sx={{ textAlign: 'left', width: '100%' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Post events and find service providers
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Review applications from professionals
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Manage your events calendar
                </Typography>
                <Typography variant="body2">
                  • Communicate with hired professionals
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 6,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  marginTop: 3
                }}
                onClick={() => handleRoleSelect('organizer')}
              >
                Continue as Organizer
              </Button>
            </Box>
          </Paper>
          
          {/* Provider Option */}
          <Paper 
            elevation={selectedRole === 'provider' ? 12 : 3}
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            sx={{ 
              p: 3, 
              flex: 1, 
              cursor: 'pointer',
              borderRadius: 4,
              border: selectedRole === 'provider' ? '2px solid #9c27b0' : 'none',
              bgcolor: selectedRole === 'provider' ? 'rgba(156, 39, 176, 0.05)' : 'white',
              maxWidth: 400,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }}
            onClick={() => handleRoleSelect('provider')}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              height: '100%'
            }}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(156, 39, 176, 0.1)', 
                  borderRadius: '50%', 
                  p: 2,
                  mb: 2
                }}
              >
                <WorkIcon sx={{ fontSize: 60, color: '#9c27b0' }} />
              </Box>
              
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                I'm a Service Provider
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                I offer my professional services for events
              </Typography>
              
              <Divider sx={{ width: '100%', mb: 3 }} />
              
              <Box sx={{ textAlign: 'left', width: '100%' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Find event opportunities in your area
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Apply to events that match your skills
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Showcase your portfolio and experience
                </Typography>
                <Typography variant="body2">
                  • Manage your bookings and schedule
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 6,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  bgcolor: '#9c27b0',
                  '&:hover': {
                    bgcolor: '#7b1fa2'
                  },
                  marginTop: 3
                }}
                onClick={() => handleRoleSelect('provider')}
              >
                Continue as Provider
              </Button>
            </Box>
          </Paper>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Don't worry, you can always switch roles later from your profile settings.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelector;
