import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button, 
  Tabs, 
  Tab, 
  Chip, 
  Divider, 
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!currentUser) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      // Store the role as organizer for login redirection
      sessionStorage.setItem('selectedRole', 'organizer');
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    // Simulate API call to fetch data
    setTimeout(() => {
      // Get events from localStorage if available
      const storedEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
      
      // If there are stored events, use them; otherwise use mock events
      if (storedEvents.length > 0) {
        // Format stored events to match the expected structure
        const formattedEvents = storedEvents.map(event => ({
          id: event._id || event.id,
          title: event.title,
          date: new Date(event.date).toLocaleDateString(),
          location: event.location,
          category: event.category,
          budget: event.budget,
          status: event.status || 'active',
          applicantsCount: event.applicantsCount || 0,
          viewCount: event.viewCount || 0,
          image: event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
          organizer: event.organizer || currentUser?.name || 'You',
          postedBy: currentUser?.name || 'You'
        }));
        
        setMyEvents([...formattedEvents, ...mockEvents]);
      } else {
        // Add organizer information to mock events
        const eventsWithOrganizer = mockEvents.map(event => ({
          ...event,
          organizer: currentUser?.name || 'You',
          postedBy: currentUser?.name || 'You'
        }));
        
        setMyEvents(eventsWithOrganizer);
      }
      
      // Get applications from localStorage if available
      const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
      
      // Combine mock applications with stored applications
      let allApplications = [...mockApplications];
      
      // Add stored applications if they don't already exist in mock data
      storedApplications.forEach(storedApp => {
        // Convert stored application to match the format of mock applications
        const formattedApp = {
          id: storedApp._id,
          eventId: storedApp.eventId,
          eventTitle: storedApp.eventTitle || 'Event Application',
          applicantName: storedApp.applicantName,
          applicantImage: storedApp.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg', // Use profile picture if available, otherwise default
          experience: '2+ years',
          price: storedApp.price || '₹15,000',
          status: storedApp.status || 'pending',
          date: new Date(storedApp.createdAt).toLocaleDateString(),
        };
        
        // Check if this application is already in the mock data
        const exists = allApplications.some(app => app.id === formattedApp.id);
        if (!exists) {
          allApplications.push(formattedApp);
        }
      });
      
      setApplications(allApplications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data for posted events
  const mockEvents = [
    {
      id: 1,
      title: 'Wedding Photography Needed',
      date: 'May 15, 2025',
      location: 'Jolarpet, Tirupattur',
      category: 'Photography',
      budget: '₹15,000-20,000',
      status: 'active',
      applicantsCount: 4,
      viewCount: 156,
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    },
    {
      id: 2,
      title: 'Birthday Party Catering',
      date: 'May 20, 2025',
      location: 'Vaniyambadi, Tirupattur',
      category: 'Catering',
      budget: '₹25,000-35,000',
      status: 'active',
      applicantsCount: 7,
      viewCount: 124,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    },
    {
      id: 3,
      title: 'College Fest DJ Required',
      date: 'June 5, 2025',
      location: 'Tirupattur Town',
      category: 'Music',
      budget: '₹8,000-12,000',
      status: 'closed',
      applicantsCount: 3,
      viewCount: 89,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    }
  ];

  // Mock data for applications received
  const mockApplications = [
    {
      id: 1,
      eventId: 1,
      eventTitle: 'Wedding Photography Needed',
      applicantName: 'Rahul Sharma',
      applicantImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      experience: '5 years',
      price: '₹18,000',
      status: 'pending',
      date: 'April 28, 2025',
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: 'Wedding Photography Needed',
      applicantName: 'Priya Patel',
      applicantImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      experience: '7 years',
      price: '₹22,000',
      status: 'pending',
      date: 'April 29, 2025',
    },
    {
      id: 3,
      eventId: 2,
      eventTitle: 'Birthday Party Catering',
      applicantName: 'Arun Catering Services',
      applicantImage: 'https://randomuser.me/api/portraits/men/22.jpg',
      experience: '10 years',
      price: '₹30,000',
      status: 'accepted',
      date: 'April 25, 2025',
    },
    {
      id: 4,
      eventId: 2,
      eventTitle: 'Birthday Party Catering',
      applicantName: 'Taste of Tirupattur',
      applicantImage: 'https://randomuser.me/api/portraits/women/28.jpg',
      experience: '4 years',
      price: '₹27,500',
      status: 'rejected',
      date: 'April 26, 2025',
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return '#4caf50';
      case 'closed':
        return '#f44336';
      case 'draft':
        return '#ff9800';
      case 'pending':
        return '#2196f3';
      case 'accepted':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const handleAcceptApplication = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status: 'accepted'} : app
    ));
  };

  const handleRejectApplication = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status: 'rejected'} : app
    ));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 0 }}>
            Recent Applications
          </Typography>
          <Button 
            component={Link} 
            to="/applications" 
            variant="outlined"
            sx={{ 
              borderColor: '#9c27b0', 
              color: '#9c27b0',
              '&:hover': { borderColor: '#7b1fa2', bgcolor: 'rgba(156, 39, 176, 0.04)' }
            }}
          >
            View All Applications
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your events and review applications from service providers
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Organizer Dashboard
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Active Events
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {myEvents.filter(e => e.status === 'active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Applications
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {applications.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Pending Applications
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
                  {applications.filter(a => a.status === 'pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Accepted Applications
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>
                  {applications.filter(a => a.status === 'accepted').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Create Event Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            component={Link}
            to="/post-event"
            sx={{ 
              bgcolor: '#9c27b0', 
              '&:hover': { bgcolor: '#7b1fa2' },
              borderRadius: 6,
              px: 3
            }}
          >
            Create New Event
          </Button>
        </Box>

        {/* Tabs for My Events and Applications */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#9c27b0',
              },
              '& .Mui-selected': {
                color: '#9c27b0',
                fontWeight: 'bold',
              },
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tab label="My Events" />
            <Tab 
              label={
                <Badge 
                  badgeContent={applications.filter(a => a.status === 'pending').length} 
                  color="error"
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}
                >
                  Applications
                </Badge>
              } 
            />
          </Tabs>
        </Box>

        {/* My Events Tab */}
        {tabValue === 0 && (
          <Box>
            {myEvents.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  You haven't posted any events yet
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/create-event"
                  sx={{ mt: 2, bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                >
                  Create Your First Event
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {myEvents.map((event) => (
                  <Grid item xs={12} key={event.id}>
                    <Card sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' },
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
                      },
                    }}>
                      <Box 
                        sx={{ 
                          width: { xs: '100%', md: 200 }, 
                          height: { xs: 140, md: 'auto' },
                          position: 'relative'
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
                          }}
                        />
                        <Chip 
                          label={event.status} 
                          size="small"
                          sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            bgcolor: getStatusColor(event.status),
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }} 
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                              {event.title}
                            </Typography>
                            <Chip 
                              label={event.category} 
                              size="small" 
                              sx={{ bgcolor: '#f3e5f5', color: '#9c27b0' }} 
                            />
                          </Box>
                          <Grid container spacing={2} sx={{ mb: 1 }}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EventIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {event.date}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  Posted by: {event.postedBy || 'You'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Divider sx={{ my: 1.5 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              Budget: {event.budget}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.viewCount} views
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, pt: 0 }}>
                          <Button 
                            size="small" 
                            startIcon={<VisibilityIcon />}
                            component={Link}
                            to={`/events/${event.id}`}
                          >
                            View
                          </Button>
                          <Button 
                            size="small" 
                            startIcon={<EditIcon />}
                            component={Link}
                            to={`/edit-event/${event.id}`}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small" 
                            color="error" 
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                          {event.applicantsCount > 0 && (
                            <Button 
                              size="small" 
                              color="primary"
                              sx={{ ml: 'auto' }}
                              onClick={() => setTabValue(1)}
                            >
                              View Applications
                            </Button>
                          )}
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Applications Tab */}
        {tabValue === 1 && (
          <Box>
            {applications.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  No applications received yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Once service providers apply to your events, they will appear here.
                </Typography>
              </Paper>
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    You have {applications.filter(a => a.status === 'pending').length} pending applications to review.
                  </Alert>
                </Box>
                <List sx={{ bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                  {applications.map((application, index) => (
                    <React.Fragment key={application.id}>
                      <ListItem 
                        alignItems="flex-start"
                        sx={{ 
                          py: 2,
                          bgcolor: application.status === 'pending' ? 'rgba(33, 150, 243, 0.05)' : 'transparent'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={application.applicantImage} 
                            alt={application.applicantName}
                            sx={{ width: 50, height: 50, mr: 1 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {application.applicantName}
                              </Typography>
                              <Chip 
                                label={application.status} 
                                size="small"
                                sx={{ 
                                  ml: 2, 
                                  bgcolor: getStatusColor(application.status),
                                  color: 'white',
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                  height: 20,
                                  '& .MuiChip-label': { px: 1 }
                                }} 
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                                Applied for: <Link to={`/applications/${application.eventId}`} style={{ textDecoration: 'none', color: '#9c27b0' }}>{application.eventTitle}</Link>
                              </Typography>
                              <Box sx={{ display: 'flex', mt: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mr: 3 }}>
                                  Experience: {application.experience}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <EventIcon fontSize="small" sx={{ mr: 1 }} />
                                  {application.eventDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                                  Posted by: {application.eventPostedBy || 'You'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Applied on: {application.date}
                                </Typography>
                              </Box>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          {application.status === 'pending' ? (
                            <Box>
                              <IconButton 
                                edge="end" 
                                aria-label="accept" 
                                sx={{ color: '#4caf50', mr: 1 }}
                                onClick={() => handleAcceptApplication(application.id)}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                              <IconButton 
                                edge="end" 
                                aria-label="reject" 
                                sx={{ color: '#f44336' }}
                                onClick={() => handleRejectApplication(application.id)}
                              >
                                <CancelIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <Button 
                              variant="outlined" 
                              size="small"
                              component={Link}
                              to={`/chat/${application.applicantName.replace(/\s+/g, '').toLowerCase()}`}
                              sx={{ 
                                borderRadius: 4,
                                borderColor: '#9c27b0',
                                color: '#9c27b0',
                                '&:hover': {
                                  borderColor: '#7b1fa2',
                                  bgcolor: 'rgba(156, 39, 176, 0.04)'
                                }
                              }}
                            >
                              Message
                            </Button>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < applications.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}
      </Container>
    </motion.div>
  );
};

export default OrganizerDashboard;
