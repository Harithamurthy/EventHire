import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';

const RoleSelectionDialog = ({ open, onClose, onSelectRole }) => {
  // Handle role selection with explicit provider role handling
  const handleSelectRole = (role) => {
    console.log('Role selected in dialog:', role);
    onSelectRole(role);
  };
  return (
    <Dialog 
      open={open} 
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1976d2' }}>
          How will you use EventHire?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Select your primary role on the platform
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Paper
                elevation={3}
                onClick={() => handleSelectRole('organizer')}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 3,
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: '#1976d2',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: '50%',
                      p: 1.5,
                      mr: 2
                    }}
                  >
                    <EventIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                  </Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Event Organizer
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  I want to hire professionals for my events
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Post events and find service providers
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Review applications from professionals
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#1976d2', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Manage your events calendar
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleSelectRole('organizer')}
                  sx={{ mt: 'auto', py: 1.2, borderRadius: 2 }}
                >
                  Continue as Organizer
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Paper
                elevation={3}
                onClick={() => handleSelectRole('provider')}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 3,
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: '#9c27b0',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(156, 39, 176, 0.1)',
                      borderRadius: '50%',
                      p: 1.5,
                      mr: 2
                    }}
                  >
                    <WorkIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                  </Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Service Provider
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  I want to offer my services for events
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Find event opportunities in your area
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Apply to events that match your skills
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ color: '#9c27b0', mr: 1, fontWeight: 'bold' }}>•</Box>
                    Manage your bookings and schedule
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectRole('provider')}
                  sx={{ 
                    mt: 'auto', 
                    py: 1.2, 
                    borderRadius: 2,
                    bgcolor: '#9c27b0',
                    '&:hover': {
                      bgcolor: '#7b1fa2',
                    }
                  }}
                >
                  Continue as Provider
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Don't worry, you can always change your role later from your profile.
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default RoleSelectionDialog;
