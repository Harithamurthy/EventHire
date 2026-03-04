import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Grid, Tabs, Tab,
  Card, CardContent, CardMedia, CardActions, Chip, Badge,
  Divider, Stepper, Step, StepLabel, StepContent
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Mock data for demonstration
const mockBookings = [
  {
    id: 1,
    eventId: 101,
    eventTitle: 'Wedding Photography Session',
    organizer: 'Rahul Sharma',
    category: 'Photography',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-07-15',
    budget: '₹20,000',
    status: 'confirmed',
    image: 'https://source.unsplash.com/random/800x600/?wedding',
    note: 'Looking forward to working with you! Please contact me to discuss further details.',
    appliedDate: '2025-05-02',
    confirmedDate: '2025-05-04'
  },
  {
    id: 2,
    eventId: 102,
    eventTitle: 'Corporate Event Sound System',
    organizer: 'Priya Patel',
    category: 'Sound & Lighting',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-06-20',
    budget: '₹15,000',
    status: 'pending',
    image: 'https://source.unsplash.com/random/800x600/?concert',
    note: '',
    appliedDate: '2025-05-03',
    confirmedDate: null
  },
  {
    id: 3,
    eventId: 103,
    eventTitle: 'Birthday Party Decoration',
    organizer: 'Akash Kumar',
    category: 'Decoration',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-05-30',
    budget: '₹8,000',
    status: 'rejected',
    image: 'https://source.unsplash.com/random/800x600/?birthday',
    note: 'Thank you for your interest. We have chosen another provider.',
    appliedDate: '2025-04-25',
    confirmedDate: null
  }
];

const MyBookings = () => {
  const { isAuthenticated } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage and combine with mock data
    const fetchBookings = async () => {
      setLoading(true);
      
      // Get applications from localStorage
      const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
      
      // Convert stored applications to the format expected by MyBookings
      const formattedApplications = storedApplications.map(app => ({
        id: app._id,
        eventId: app.eventId,
        eventTitle: app.eventTitle || 'Event Application',
        organizer: 'Event Organizer', // This would come from the actual event data in a real app
        category: app.eventCategory || 'General',
        location: app.eventLocation || 'Tirupattur, Tamil Nadu',
        date: app.eventDate || new Date().toISOString().split('T')[0],
        budget: app.price || '₹15,000',
        status: app.status || 'pending',
        image: app.eventImage || 'https://source.unsplash.com/random/800x600/?event',
        note: app.message || '',
        appliedDate: new Date(app.createdAt).toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        confirmedDate: app.status === 'accepted' ? new Date().toISOString().split('T')[0] : null
      }));
      
      // Combine with mock data for demonstration
      const allBookings = [...formattedApplications, ...mockBookings];
      
      // Remove duplicates based on id
      const uniqueBookings = allBookings.filter((booking, index, self) => 
        index === self.findIndex(b => b.id === booking.id)
      );
      
      setBookings(uniqueBookings);
      setLoading(false);
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (tabValue === 0) return true; // All bookings
    if (tabValue === 1) return booking.status === 'confirmed';
    if (tabValue === 2) return booking.status === 'pending';
    if (tabValue === 3) return booking.status === 'rejected';
    return true;
  });

  // Get status label and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'confirmed':
        return { label: 'Confirmed', color: 'success', icon: <CheckCircleIcon fontSize="small" /> };
      case 'pending':
        return { label: 'Pending', color: 'warning', icon: <AccessTimeIcon fontSize="small" /> };
      case 'rejected':
        return { label: 'Not Selected', color: 'error', icon: null };
      default:
        return { label: status, color: 'default', icon: null };
    }
  };

  // Get status step for the booking timeline
  const getStatusStep = (booking) => {
    switch(booking.status) {
      case 'confirmed':
        return 2;
      case 'pending':
        return 1;
      case 'rejected':
        return 1; // For rejected, we also stop at step 1 but with different messaging
      default:
        return 0;
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Please login to view your bookings</Typography>
          <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">My Bookings</Typography>
          <Button 
            component={Link} 
            to="/events" 
            variant="contained" 
            color="primary"
          >
            Browse More Events
          </Button>
        </Box>

        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="All Bookings" />
            <Tab 
              label={
                <Badge badgeContent={bookings.filter(b => b.status === 'confirmed').length} color="success">
                  Confirmed
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={bookings.filter(b => b.status === 'pending').length} color="warning">
                  Pending
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={bookings.filter(b => b.status === 'rejected').length} color="error">
                  Not Selected
                </Badge>
              } 
            />
          </Tabs>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Typography>Loading your bookings...</Typography>
          </Box>
        ) : filteredBookings.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>No bookings found</Typography>
            <Typography paragraph color="text.secondary">
              You haven't applied to any events yet. Browse events to find opportunities.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);
              const statusStep = getStatusStep(booking);
              
              return (
                <Grid item xs={12} key={booking.id}>
                  <Card sx={{ maxWidth: 220, mx: 'auto', my: 0.5, p: 0.5, boxShadow: 1 }}>
                    <Grid container alignItems="center" spacing={0.5}>
                      <Grid item xs={12} sm={12} md={12}>
                        <CardMedia
                          component="img"
                          height="60"
                          image={booking.image}
                          alt={booking.eventTitle}
                          sx={{
                            objectFit: 'cover',
                            borderRadius: 1,
                            width: '60%',
                            maxWidth: '70px',
                            margin: '6px auto 2px auto',
                            boxShadow: 0
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <CardContent sx={{ p: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
  {booking.eventTitle}
</Typography>
<Chip 
  icon={statusInfo.icon}
  label={statusInfo.label} 
  color={statusInfo.color}
/>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.2 }}>
                            <Chip 
                              label={booking.category} 
                              size="small" 
                              sx={{ bgcolor: '#f3e5f5', color: '#9c27b0', fontSize: '0.65rem', mr: 0.5, height: 18 }} 
                            />
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Chip 
                              icon={<LocationOnIcon fontSize="small" />}
                              label={booking.location.split(',')[0]} 
                              size="small" 
                            />
                            <Chip 
                              icon={<EventIcon fontSize="small" />}
                              label={new Date(booking.date).toLocaleDateString()} 
                              size="small" 
                            />
                            <Chip 
                              icon={<PersonIcon fontSize="small" />}
                              label={booking.organizer} 
                              size="small" 
                            />
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Booking Timeline
                            </Typography>
                            
                            <Stepper activeStep={statusStep} orientation="vertical" sx={{ mt: 2 }}>
                              <Step>
                                <StepLabel>Application Submitted</StepLabel>
                                <StepContent>
                                  <Typography variant="body2">
                                    You applied for this event on {new Date(booking.appliedDate).toLocaleDateString()}
                                  </Typography>
                                </StepContent>
                              </Step>
                              
                              <Step>
                                <StepLabel>{
                                  booking.status === 'rejected' 
                                    ? 'Application Status' 
                                    : 'Application Reviewed'
                                }</StepLabel>
                                <StepContent>
                                  <Typography variant="body2">
                                    {booking.status === 'rejected' 
                                      ? 'Your application was not selected for this event.' 
                                      : booking.status === 'pending'
                                        ? 'Your application is currently under review.'
                                        : 'Your application was accepted!'}
                                  </Typography>
                                </StepContent>
                              </Step>
                              
                              <Step>
                                <StepLabel>Booking Confirmed</StepLabel>
                                <StepContent>
                                  <Typography variant="body2">
                                    {booking.status === 'confirmed'
                                      ? `Booking confirmed on ${new Date(booking.confirmedDate).toLocaleDateString()}`
                                      : 'Waiting for confirmation'}
                                  </Typography>
                                </StepContent>
                              </Step>
                            </Stepper>
                          </Box>
                          
                          {booking.note && (
                            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mt: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                <DescriptionIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Note from Organizer
                              </Typography>
                              <Typography variant="body2">
                                {booking.note}
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                        
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button 
                            component={Link}
                            to={`/events/${booking.eventId}`}
                            variant="outlined"
                            size="small"
                          >
                            View Event Details
                          </Button>
                          
                          {booking.status === 'confirmed' && (
                            <Button 
                              variant="contained" 
                              color="primary"
                              size="small"
                              component={Link}
                              to={`/messages/${booking.id}`}
                            >
                              Contact Organizer
                            </Button>
                          )}
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </motion.div>
  );
};

export default MyBookings;
