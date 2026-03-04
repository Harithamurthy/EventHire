import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAuth } from '../context/AuthContext';
import ApplicationForm from '../components/ApplicationForm';

const ApplyEvent = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock event data - In real app, fetch from API
  const mockEvents = {
    1: {
      id: 1,
      title: 'Wedding Photography Needed',
      description: 'We are looking for a professional photographer for our traditional Tamil wedding.',
      location: 'Jolarpet, Tirupattur',
      date: 'May 15, 2025',
      category: 'Photography',
      budget: '₹15,000-20,000',
      postedBy: 'Ramesh Kumar',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    },
    2: {
      id: 2,
      title: 'Birthday Party Catering',
      description: 'We need catering services for a 50th birthday celebration with about 100 guests.',
      location: 'Vaniyambadi, Tirupattur',
      date: 'May 20, 2025',
      category: 'Catering',
      budget: '₹25,000-35,000',
      postedBy: 'Priya Sundaram',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    },
    3: {
      id: 3,
      title: 'College Fest DJ Required',
      description: 'Our engineering college annual cultural fest needs an experienced DJ for the final night party.',
      location: 'Tirupattur Town',
      date: 'June 5, 2025',
      category: 'Music',
      budget: '₹10,000-15,000',
      postedBy: 'Karthik Rajan',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      // Store the role as provider for login redirection
      sessionStorage.setItem('selectedRole', 'provider');
      
      // Check if we have a token in localStorage (as a backup check)
      const token = localStorage.getItem('token');
      if (!token) {
        // Only redirect if we don't have a token
        console.log('No token found, redirecting to login');
        window.location.href = '/login';
        return;
      } else {
        console.log('Token found but isAuthenticated is false. Attempting to continue anyway.');
      }
    }
    
    console.log('User is authenticated or has token, proceeding with event application');

    // Simulate API call to fetch event details
    setLoading(true);
    
    // In a real app, you would fetch from your API
    // For now, use mock data or generate a mock event if ID doesn't match
    setTimeout(() => {
      // Try to get event from mock data
      let foundEvent = mockEvents[eventId];
      
      // If not found, create a mock event with the ID
      if (!foundEvent) {
        foundEvent = {
          id: eventId,
          title: `Event ${eventId}`,
          description: 'This is a mock event description for demonstration purposes.',
          location: 'Tirupattur, Tamil Nadu',
          date: 'June 15, 2025',
          category: 'General',
          budget: '₹10,000-15,000',
          postedBy: 'Event Organizer',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
        };
      }
      
      setEvent(foundEvent);
      setLoading(false);
    }, 800);
  }, [eventId, isAuthenticated, navigate]);

  const handleApplicationSubmit = (formData) => {
    console.log('Application submitted:', formData);
    // In a real app, you would send this data to your backend
    
    // Get user profile data for the profile picture
    const userProfileData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
    
    // Create a mock application in localStorage to simulate backend storage
    const newApplication = {
      _id: `app_${Date.now()}`,
      eventId: eventId,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      eventCategory: event.category,
      eventImage: event.image,
      applicantName: formData.fullName,
      applicantEmail: formData.email,
      applicantPhone: formData.phone,
      price: formData.price,
      message: formData.message,
      profilePicture: formData.profilePicture || userProfileData.profilePicture || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Get existing applications or initialize empty array
    const existingApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
    
    // Add new application
    existingApplications.push(newApplication);
    
    // Save to localStorage
    localStorage.setItem('myApplications', JSON.stringify(existingApplications));
    
    // Navigate to provider dashboard after successful submission
    setTimeout(() => {
      navigate('/provider-dashboard?tab=1&applied=true');
    }, 2000);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="secondary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading event details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate('/find-events')}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Apply for Event
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={event.image}
                alt={event.title}
                sx={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Chip 
                  label={event.category} 
                  size="small" 
                  sx={{ mb: 1, bgcolor: '#f3e5f5', color: '#9c27b0' }} 
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Location:</strong> {event.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Date:</strong> {event.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Budget:</strong> {event.budget}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Posted By:</strong> {event.postedBy}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          
          <ApplicationForm 
            event={event} 
            onSubmit={handleApplicationSubmit}
            onCancel={() => navigate(`/events/${eventId}`)}
          />
          
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => navigate(`/events/${eventId}`)}
            >
              Back to Event Details
            </Button>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default ApplyEvent;
