import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../context/AuthContext';
import ApplicationForm from '../components/ApplicationForm';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isOwnEvent, setIsOwnEvent] = useState(false);

  // Mock event data - In real app, fetch from API
  const mockEvents = {
    1: {
      id: 1,
      title: 'Wedding Photography Needed',
      description: 'We are looking for a professional photographer for our traditional Tamil wedding. The event will span two days, including pre-wedding ceremonies. We want both candid and portrait photography, with fast delivery of digital photos. Experience with Tamil weddings is a plus.',
      location: 'Jolarpet, Tirupattur',
      date: 'May 15, 2025',
      time: '7:00 AM - 10:00 PM',
      category: 'Photography',
      budget: '₹15,000-20,000',
      postedBy: 'Ramesh Kumar',
      postedOn: 'February 10, 2025',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'At least 3 years experience in wedding photography',
        'Portfolio showing similar events',
        'Own photography equipment',
        'Ability to deliver edited photos within 2 weeks',
        'Team of at least 2 photographers'
      ],
      contactPhone: '+91 9876543210',
      contactEmail: 'ramesh@example.com',
      viewCount: 156,
      applicants: 4,
    },
    2: {
      id: 2,
      title: 'Birthday Party Catering',
      description: 'We need catering services for a 50th birthday celebration with about 100 guests. Looking for both vegetarian and non-vegetarian options, with a focus on traditional Tamil cuisine. Service staff should be included in the package. The venue has kitchen facilities available.',
      location: 'Vaniyambadi, Tirupattur',
      date: 'May 20, 2025',
      time: '6:00 PM - 11:00 PM',
      category: 'Catering',
      budget: '₹25,000-35,000',
      postedBy: 'Priya Sundaram',
      postedOn: 'February 15, 2025',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'Experience in catering for large gatherings',
        'Ability to provide both veg and non-veg options',
        'Must include serving staff',
        'Health certification required',
        'Sample menu should be provided before finalizing'
      ],
      contactPhone: '+91 9845673210',
      contactEmail: 'priya.s@example.com',
      viewCount: 124,
      applicants: 7,
    },
    3: {
      id: 3,
      title: 'College Fest DJ Required',
      description: 'Our engineering college annual cultural fest needs an experienced DJ for the final night party. The event will have approximately 500 students. We need someone who can play a mix of latest Bollywood, Tamil, and English tracks. Sound equipment should be provided by the DJ.',
      location: 'Tirupattur Town',
      date: 'June 5, 2025',
      time: '7:00 PM - 1:00 AM',
      category: 'Music',
      budget: '₹8,000-12,000',
      postedBy: 'Karthik Rajan',
      postedOn: 'March 1, 2025',
      image: 'https://img.freepik.com/free-photo/techno-party-lifestyle_52683-122049.jpg?w=1200&h=600&semt=ais_hybrid',
      requirements: [
        'Prior experience with college events',
        'Must have own sound equipment',
        'Ability to take song requests',
        'Should arrive 2 hours before for setup',
        'Playlist should be approved by event committee'
      ],
      contactPhone: '+91 8876543210',
      contactEmail: 'karthik@example.com',
      viewCount: 85,
      applicants: 3,
    },
    4: {
      id: 4,
      title: 'Corporate Event Planner',
      description: 'Our IT company is celebrating its 10th anniversary and we need a professional event planner to organize a day-long event including team building activities, lunch, and an evening gala dinner. Expected attendance is about 150 employees plus their families.',
      location: 'Ambur, Tirupattur',
      date: 'June 15, 2025',
      time: '9:00 AM - 10:00 PM',
      category: 'Planning',
      budget: '₹50,000-75,000',
      postedBy: 'Meena Krishnan',
      postedOn: 'February 20, 2025',
      image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'Experience in corporate event management',
        'Should handle venue booking and decorations',
        'Catering arrangements to be included',
        'Entertainment activities to be organized',
        'Photography and videography to be arranged'
      ],
      contactPhone: '+91 9976543210',
      contactEmail: 'meena@techinnovate.com',
      viewCount: 103,
      applicants: 6,
    },
    5: {
      id: 5,
      title: 'Traditional Dance Performance',
      description: 'We are organizing a cultural program for our temple festival and need Bharatanatyam dancers for a 1-hour performance. Looking for a group of 4-6 dancers with their own costumes and music. Performance will be in an open-air stage with professional lighting.',
      location: 'Natrampalli, Tirupattur',
      date: 'May 25, 2025',
      time: '6:30 PM - 7:30 PM',
      category: 'Performance',
      budget: '₹10,000-15,000',
      postedBy: 'Lakshmi Narayan',
      postedOn: 'February 25, 2025',
      image: 'https://images.unsplash.com/photo-1504647164485-1d91e1d0a112?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'Trained Bharatanatyam dancers only',
        'Previous performance experience required',
        'Own costumes and makeup',
        'Should be available for a rehearsal day before',
        'Group performance preferred'
      ],
      contactPhone: '+91 9876543211',
      contactEmail: 'lakshmi@example.com',
      viewCount: 76,
      applicants: 2,
    },
    6: {
      id: 6,
      title: 'Wedding Decoration Services',
      description: 'We need a decorator for our wedding venue - both the mandapam and reception hall need to be decorated. Looking for a traditional South Indian theme with flowers and banana leaves for the ceremony, and a more modern look for the reception. Expected guests: 300.',
      location: 'Alangayam, Tirupattur',
      date: 'July 10, 2025',
      time: 'All day event',
      category: 'Decoration',
      budget: '₹30,000-40,000',
      postedBy: 'Vishnu Prakash',
      postedOn: 'March 5, 2025',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'Experience in wedding decorations',
        'Portfolio of previous work required',
        'Must be able to source all materials',
        'Setup team should be available from previous night',
        'Should be able to incorporate family heirlooms in decor'
      ],
      contactPhone: '+91 9876543212',
      contactEmail: 'vishnu@example.com',
      viewCount: 92,
      applicants: 5,
    },
    7: {
      id: 7,
      title: 'Anniversary Party Host',
      description: 'We are planning a surprise 25th anniversary party for our parents and need an experienced host/MC who can manage the event flow, conduct fun games, and keep the mood lively. The event will be attended by about 50 family members and close friends.',
      location: 'Tirupattur Central',
      date: 'June 22, 2025',
      time: '7:00 PM - 11:00 PM',
      category: 'Planning',
      budget: '₹5,000-8,000',
      postedBy: 'Divya Shankar',
      postedOn: 'March 10, 2025',
      image: 'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa5e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      requirements: [
        'Fluent in Tamil and English',
        'Experience hosting family events',
        'Should plan interactive games and activities',
        'Ability to coordinate with musicians and caterers',
        'Well-dressed and professional demeanor'
      ],
      contactPhone: '+91 9876543213',
      contactEmail: 'divya@example.com',
      viewCount: 68,
      applicants: 4,
    }
  };

  useEffect(() => {
    // Simulate API call to fetch event details
    setLoading(true);
    
    // Try to get event by ID first
    const numericId = parseInt(eventId);
    let foundEvent = null;
    
    if (!isNaN(numericId) && mockEvents[numericId]) {
      foundEvent = mockEvents[numericId];
    } else {
      // If not found by ID, try to match by slugified title
      const eventValues = Object.values(mockEvents);
      
      // First try with exact match
      foundEvent = eventValues.find(event => 
        event.title.toLowerCase().replace(/\s+/g, '-') === eventId
      );
      
      // If still not found, try partial matching
      if (!foundEvent) {
        foundEvent = eventValues.find(event => 
          eventId.includes(event.title.toLowerCase().split(' ')[0]) ||
          event.title.toLowerCase().includes(eventId.replace(/-/g, ' '))
        );
      }
      
      // If still not found, default to the first event as fallback
      if (!foundEvent && eventValues.length > 0) {
        foundEvent = eventValues[0];
        console.log(`Event ${eventId} not found, defaulting to first event`);
      }
    }
    
    setTimeout(() => {
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Check if user is the organizer of this event
        const userRole = localStorage.getItem('userRole');
        setIsOrganizer(userRole === 'organizer');
        
        // Check if this is the user's own event (for organizers)
        if (userRole === 'organizer') {
          // For demo purposes, we'll consider events with IDs 1, 2, and 3 as the user's own events
          setIsOwnEvent([1, 2, 3].includes(parseInt(eventId)));
        }
      }
      setLoading(false);
    }, 500); // Reduced loading time for better UX

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [eventId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, send this to your backend
    console.log(`Message sent to event organizer: ${message}`);
    
    // Clear the message input and show applied status
    setMessage('');
    setApplied(true);
    
    // Show success notification with timeout
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 1500);
  };

  // Loading state
  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography>Loading event details...</Typography>
        </Box>
      </Container>
    );
  }

  // If event not found
  if (!event) {
    return (
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Event not found
          </Typography>
          <Button 
            component={Link} 
            to="/find-events" 
            variant="contained"
            startIcon={<KeyboardBackspaceIcon />}
          >
            Back to Events
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          position: 'relative',
          height: { xs: '250px', md: '400px' },
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
          }}
        >
          <Typography
            variant="h3"
            color="white"
            align="center"
            sx={{
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 1,
            }}
          >
            {event.title}
          </Typography>
          <Chip
            label={event.category}
            color="secondary"
            sx={{ mb: 2, bgcolor: '#9c27b0', color: 'white' }}
          />
        </Box>
      </Box>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Event Description
              </Typography>
              <Typography paragraph>
                {event.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Requirements
              </Typography>
              <List disablePadding>
                {event.requirements.map((req, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          mt: 1,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            
            {/* Only show Contact Event Organizer section for service providers, not for organizers viewing their own events */}
            {!isOwnEvent && (
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Contact Event Organizer
                </Typography>
                
                {isAuthenticated ? (
                  <>
                    <Typography paragraph color="text.secondary">
                      Interested in this opportunity? Send a message to the event organizer.
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Introduce yourself and explain why you're a good fit for this event..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button 
                      variant="contained" 
                      endIcon={<SendIcon />}
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      Send Message
                    </Button>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography paragraph>
                      Please log in to contact the event organizer.
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/login" 
                      variant="contained"
                      sx={{ mr: 2 }}
                    >
                      Log In
                    </Button>
                    <Button 
                      component={Link} 
                      to="/register" 
                      variant="outlined"
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4, position: 'sticky', top: 20 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {event.postedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Posted on {event.postedOn}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <CalendarTodayIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Event Date" 
                      secondary={event.date}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <AccessTimeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Event Time" 
                      secondary={event.time}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <LocationOnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Location" 
                      secondary={event.location}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <MonetizationOnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Budget" 
                      secondary={event.budget}
                    />
                  </ListItem>
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {event.viewCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Views
                    </Typography>
                  </Box>
                  
                  <Divider orientation="vertical" flexItem />
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {event.applicants}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Applicants
                    </Typography>
                  </Box>
                </Box>
                
                {/* Only show Apply button for service providers viewing others' events */}
                {!isOwnEvent && !isOrganizer && (
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    sx={{ 
                      mt: 3,
                      bgcolor: applied ? '#4caf50' : '#9c27b0',
                      '&:hover': {
                        bgcolor: applied ? '#388e3c' : '#7b1fa2',
                      }
                    }}
                    onClick={() => {
                      if (!isAuthenticated) {
                        // Store the current URL to redirect back after login
                        sessionStorage.setItem('redirectAfterLogin', `/apply/${eventId}`);
                        window.location.href = '/login';
                        return;
                      }
                      // Navigate to the dedicated apply page
                      window.location.href = `/apply/${eventId}`;
                    }}
                    disabled={applied}
                  >
                    {applied ? "Applied Successfully" : "Apply Now"}
                  </Button>
                )}
                
                {/* Show event management buttons for organizers viewing their own events */}
                {isOwnEvent && isOrganizer && (
                  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="large"
                      component={Link}
                      to={`/applications/${eventId}`}
                      sx={{ 
                        bgcolor: '#1976d2',
                        '&:hover': {
                          bgcolor: '#1565c0',
                        }
                      }}
                    >
                      View Applications
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      size="large"
                      component={Link}
                      to={`/edit-event/${eventId}`}
                    >
                      Edit Event
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            <Button
              component={Link}
              to="/find-events"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{ mb: 2 }}
            >
              Back to Events
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Application Form Section - Only show for service providers */}
      {showForm && isAuthenticated && !isOrganizer && !isOwnEvent && (
        <Box 
          id="contact-form" 
          sx={{ 
            mt: 4, 
            mb: 8, 
            mx: 'auto', 
            maxWidth: 'md',
            scrollMarginTop: '80px',
          }}
        >
          <ApplicationForm 
            event={event} 
            onSubmit={(formData) => {
              console.log('Application submitted:', formData);
              setApplied(true);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </Box>
      )}
    </motion.div>
  );
};

export default EventDetail;
