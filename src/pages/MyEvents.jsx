import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Grid, Tabs, Tab,
  Card, CardContent, CardMedia, CardActions, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider,
  CircularProgress, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { eventAPI } from '../services/api';
import { toast } from 'react-toastify';
const mockEvents = [
  {
    id: 1,
    title: 'Wedding Photography',
    category: 'Photography',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-07-15',
    budget: '₹15,000 - ₹25,000',
    description: 'Looking for a professional photographer for a traditional Tamil wedding.',
    status: 'active',
    applicants: 4,
    image: 'https://source.unsplash.com/random/800x600/?wedding',
    createdAt: '2025-04-30'
  },
  {
    id: 2,
    title: 'Birthday Party Catering',
    category: 'Catering',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-06-10',
    budget: '₹10,000 - ₹15,000',
    description: 'Need catering services for a birthday party with approximately 50 guests.',
    status: 'active',
    applicants: 2,
    image: 'https://source.unsplash.com/random/800x600/?catering',
    createdAt: '2025-05-01'
  },
  {
    id: 3,
    title: 'Corporate Event DJ',
    category: 'Music & DJ',
    location: 'Tirupattur, Tamil Nadu',
    date: '2025-05-25',
    budget: '₹8,000 - ₹12,000',
    description: 'Looking for a DJ for a corporate annual day celebration.',
    status: 'closed',
    applicants: 5,
    image: 'https://source.unsplash.com/random/800x600/?dj',
    createdAt: '2025-04-15'
  }
];

const MyEvents = () => {
  const { isAuthenticated } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Mock events for demonstration purposes
  const mockEvents = [
    {
      _id: 'mock1',
      title: 'Wedding Photography',
      category: 'Photography',
      location: 'Tirupattur, Tamil Nadu',
      date: '2025-07-15',
      budget: '₹15,000 - ₹25,000',
      description: 'Looking for a professional photographer for a traditional Tamil wedding.',
      status: 'active',
      applications: [],
      image: 'https://source.unsplash.com/random/800x600/?wedding',
      createdAt: '2025-04-30'
    },
    {
      _id: 'mock2',
      title: 'Birthday Party Catering',
      category: 'Catering',
      location: 'Tirupattur, Tamil Nadu',
      date: '2025-06-10',
      budget: '₹10,000 - ₹15,000',
      description: 'Need catering services for a birthday party with approximately 50 guests.',
      status: 'active',
      applications: [],
      image: 'https://source.unsplash.com/random/800x600/?catering',
      createdAt: '2025-05-01'
    }
  ];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      console.log('Fetching my events...');
      const response = await eventAPI.getMyEvents();
      console.log('My events response:', response);
      
      let foundEvents = [];
      
      // Check if response.data exists and handle different response formats
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          foundEvents = response.data;
          console.log('Events set successfully:', response.data);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Handle case where events are in response.data.data (common API pattern)
          foundEvents = response.data.data;
          console.log('Events set from data property:', response.data.data);
        } else if (response.data.events && Array.isArray(response.data.events)) {
          // Handle case where events might be nested in response
          foundEvents = response.data.events;
          console.log('Events set from events property:', response.data.events);
        } else {
          console.error('Response data is not in expected format:', response.data);
        }
      } else {
        console.error('No data in response:', response);
      }
      
      // If no events were found from the API, use mock data temporarily
      if (foundEvents.length === 0) {
        console.log('No events found from API, using mock data temporarily');
        setEvents(mockEvents);
      } else {
        setEvents(foundEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events. Please try again.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await eventAPI.deleteEvent(eventToDelete._id);
      setEvents(events.filter(event => event._id !== eventToDelete._id));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event. Please try again.');
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  // Filter events based on active tab
  const filteredEvents = Array.isArray(events) ? events.filter(event => {
    if (tabValue === 0) return true; // All events
    if (tabValue === 1) return event.status === 'active';
    if (tabValue === 2) return event.status === 'closed';
    return true;
  }) : [];

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Please login to view your events</Typography>
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
          <Typography variant="h4" component="h1">My Events</Typography>
          <Button 
            component={Link} 
            to="/create-event" 
            variant="contained" 
            color="primary"
          >
            Post New Event
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
            <Tab label="All Events" />
            <Tab label="Active" />
            <Tab label="Closed" />
          </Tabs>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Typography>Loading your events...</Typography>
          </Box>
        ) : filteredEvents.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>No events found</Typography>
            <Typography paragraph color="text.secondary">
              You haven't posted any events yet. Click the button above to create your first event.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'}
                    alt={event.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {event.title}
                      </Typography>
                      <Chip 
                        label={event.status === 'active' ? 'Active' : 'Closed'} 
                        color={event.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip 
                        label={event.category} 
                        size="small" 
                        color="primary"
                      />
                      <Chip 
                        label={event.location.split(',')[0]} 
                        size="small" 
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description.length > 100 
                        ? `${event.description.substring(0, 100)}...` 
                        : event.description}
                    </Typography>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" component="div">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Date:</Box> {new Date(event.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" component="div">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Applicants:</Box> {event.applications?.length || 0}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
                    <Button 
                      component={Link}
                      to={`/events/${event._id}`}
                      startIcon={<VisibilityIcon />}
                      size="small"
                    >
                      View
                    </Button>
                    
                    <Box>
                      <IconButton 
                        component={Link}
                        to={`/edit-event/${event._id}`}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      
                      <IconButton 
                        color="error" 
                        size="small"
                        onClick={() => handleDeleteClick(event)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the event "{eventToDelete?.title}"? 
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </motion.div>
  );
};

export default MyEvents;
