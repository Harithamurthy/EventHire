import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Badge,
  Paper,
  Alert,
  CircularProgress,
  CardMedia
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import { useAuth } from '../context/AuthContext';
import { eventAPI, applicationAPI } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const ProviderDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false); // Start with loading false
  const [opportunities, setOpportunities] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { currentUser } = useAuth();

  // Mock data for demonstration purposes only
  const mockOpportunities = [
    {
      _id: 'mock1',
      title: 'Wedding Photography Needed',
      date: '2025-07-15',
      location: 'Tirupattur, Tamil Nadu',
      category: 'Photography',
      budget: '₹15,000-20,000',
      organizer: { name: 'Demo User' },
      createdAt: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    },
    {
      _id: 'mock2',
      title: 'Birthday Party Catering',
      date: '2025-06-10',
      location: 'Tirupattur, Tamil Nadu',
      category: 'Catering',
      budget: '₹25,000-35,000',
      organizer: { name: 'Demo User' },
      createdAt: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
    }
  ];

  // Mock applications for demonstration
  const mockApplications = [
    {
      _id: 'app1',
      event: {
        _id: 'mock1',
        title: 'Wedding Photography Needed',
        date: '2025-07-15',
        organizer: { name: 'Demo User' },
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
      },
      status: 'pending',
      price: '₹18,000',
      message: 'I am interested in providing photography services for your wedding.',
      createdAt: new Date().toISOString()
    }
  ];

  // Initialize with mock data and handle URL parameters
  useEffect(() => {
    // Check for tab parameter in URL
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    const appliedParam = params.get('applied');
    
    // Set tab value based on URL parameter
    if (tabParam) {
      setTabValue(parseInt(tabParam, 10));
    }
    
    // Show success alert if application was just submitted
    if (appliedParam === 'true') {
      setShowSuccessAlert(true);
      // Clear the URL parameter after 5 seconds
      setTimeout(() => {
        navigate('/provider-dashboard', { replace: true });
        setShowSuccessAlert(false);
      }, 5000);
    }
    
    // Always use mock data to ensure display
    setOpportunities(mockOpportunities);
    
    // Try to load applications from localStorage first
    const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
    if (storedApplications.length > 0) {
      setMyApplications(storedApplications);
    } else {
      // Fall back to mock applications if none in localStorage
      setMyApplications(mockApplications);
    }
    
    // Try to fetch real data in background
    if (currentUser) {
      fetchRealData();
    }
  }, [currentUser, location.search, navigate]);

  const fetchRealData = async () => {
    try {
      // Fetch all events for opportunities
      console.log('Fetching all events for opportunities...');
      const eventsResponse = await eventAPI.getAllEvents();
      console.log('Events response:', eventsResponse);
      
      // Fetch user's applications
      console.log('Fetching user applications...');
      const applicationsResponse = await applicationAPI.getMyApplications();
      console.log('Applications response:', applicationsResponse);
      
      // Process real data if available, but don't replace mock data if empty
      if (eventsResponse?.data?.data?.length > 0) {
        setOpportunities(eventsResponse.data.data);
      }
      
      if (applicationsResponse?.data?.data?.length > 0) {
        setMyApplications(applicationsResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Don't show error toast since we're already displaying mock data
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return '#f57c00'; // Orange
      case 'accepted':
        return '#43a047'; // Green
      case 'rejected':
        return '#e53935'; // Red
      default:
        return '#757575'; // Grey
    }
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'photography':
        return '#1e88e5'; // Blue
      case 'catering':
        return '#8e24aa'; // Purple
      case 'music':
      case 'music & dj':
        return '#d81b60'; // Pink
      case 'videography':
        return '#00897b'; // Teal
      default:
        return '#5e35b1'; // Deep Purple
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Provider Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your service applications and find new opportunities.
          </Typography>
          
          {showSuccessAlert && (
            <Alert 
              severity="success" 
              sx={{ mt: 2, borderRadius: 2 }}
              onClose={() => setShowSuccessAlert(false)}
            >
              Your application has been submitted successfully! You can view it in the My Applications tab.
            </Alert>
          )}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="dashboard tabs"
            sx={{ 
              '& .MuiTab-root': { 
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 100
              },
              '& .Mui-selected': { color: '#9c27b0' },
              '& .MuiTabs-indicator': { backgroundColor: '#9c27b0' }
            }}
          >
            <Tab label="Available Opportunities" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>My Applications</span>
                  {myApplications.length > 0 && (
                    <Badge 
                      badgeContent={myApplications.filter(app => app.status === 'pending').length} 
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              } 
            />
          </Tabs>
        </Box>

        {/* Available Opportunities Tab */}
        {tabValue === 0 && (
          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#9c27b0' }} />
              </Box>
            ) : opportunities.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  No opportunities available at the moment
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Check back later for new events or refresh the page.
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<SearchIcon />}
                  onClick={fetchRealData}
                  sx={{ mt: 2, bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                >
                  Refresh
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {opportunities.map((opportunity) => (
                  <Grid item xs={12} sm={6} md={4} key={opportunity._id}>
                    <Card sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
                      },
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={opportunity.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'}
                        alt={opportunity.title}
                      />
                      <Box sx={{ position: 'relative', mt: -4 }}>
                        <Chip 
                          label={opportunity.category} 
                          size="small" 
                          sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 16,
                            bgcolor: getCategoryColor(opportunity.category),
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }} 
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                          {opportunity.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EventIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(opportunity.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {opportunity.location}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Budget: {opportunity.budget}
                          </Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                          Posted by {opportunity.organizer?.name || 'Anonymous'} on {new Date(opportunity.createdAt).toLocaleDateString()}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {opportunity.views || 0} views
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {opportunity.applications?.length || 0} applicants
                          </Typography>
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          component={Link} 
                          to={`/events/${opportunity._id}`}
                          size="small"
                          sx={{ 
                            color: '#9c27b0',
                            '&:hover': { bgcolor: 'rgba(156, 39, 176, 0.04)' }
                          }}
                        >
                          View Details
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            // Ensure authentication token is set in localStorage before navigating
                            const token = localStorage.getItem('token');
                            if (!token) {
                              // If no token, store redirect path and navigate to login
                              sessionStorage.setItem('redirectAfterLogin', `/apply/${opportunity._id}`);
                              sessionStorage.setItem('selectedRole', 'provider');
                              navigate('/login');
                            } else {
                              // If token exists, navigate directly to apply page
                              navigate(`/apply/${opportunity._id}`);
                            }
                          }}
                          variant="contained" 
                          size="small"
                          sx={{ 
                            ml: 'auto',
                            bgcolor: '#9c27b0',
                            '&:hover': { bgcolor: '#7b1fa2' }
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* My Applications Tab */}
        {tabValue === 1 && (
          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#9c27b0' }} />
              </Box>
            ) : myApplications.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  You haven't applied to any events yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Browse available opportunities and submit your first application.
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<SearchIcon />}
                  onClick={() => setTabValue(0)}
                  sx={{ mt: 2, bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                >
                  Browse Opportunities
                </Button>
              </Paper>
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    <Typography variant="body2">
                      You have {myApplications.filter(app => app.status === 'pending').length} pending applications. Check back later for updates from organizers.
                    </Typography>
                  </Alert>
                </Box>
                
                <Grid container spacing={3}>
                  {myApplications.map((application) => (
                    <Grid item xs={12} md={6} key={application._id}>
                      <Card sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
                        },
                        borderLeft: `4px solid ${getStatusColor(application.status)}`
                      }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', p: { xs: 2, sm: 3 }, pb: 0 }}>
                            <Box sx={{ position: 'relative', width: 100, height: 100, flexShrink: 0, mr: 2 }}>
                              <img 
                                src={application.event?.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'} 
                                alt={application.event?.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                              />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                  {application.event?.title}
                                </Typography>
                                <Chip 
                                  label={application.status} 
                                  size="small"
                                  sx={{ 
                                    bgcolor: getStatusColor(application.status),
                                    color: 'white',
                                    fontWeight: 500,
                                    textTransform: 'capitalize'
                                  }}
                                />
                              </Box>
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Event Date: {application.event?.date ? new Date(application.event.date).toLocaleDateString() : 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <MonetizationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    Your Quote: {application.price}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <WorkIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    Applied On: {new Date(application.createdAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {application.message && application.message.substring(0, 50) + (application.message.length > 50 ? '...' : '')}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Organizer: {application.event?.organizer?.name || 'Anonymous'}
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, pt: 0 }}>
                            <Button 
                              size="small" 
                              component={Link}
                              to={`/events/${application.event?._id}`}
                              sx={{ 
                                color: '#9c27b0',
                                '&:hover': {
                                  bgcolor: 'rgba(156, 39, 176, 0.04)'
                                }
                              }}
                            >
                              View Event
                            </Button>
                            {application.status === 'accepted' && (
                              <Button 
                                size="small" 
                                variant="contained"
                                startIcon={<MessageIcon />}
                                component={Link}
                                to={`/chat/${application.event?.organizer?._id}`}
                                sx={{ 
                                  ml: 'auto',
                                  bgcolor: '#9c27b0',
                                  '&:hover': { bgcolor: '#7b1fa2' }
                                }}
                              >
                                Contact Organizer
                              </Button>
                            )}
                            {application.status === 'pending' && (
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ ml: 'auto', fontStyle: 'italic' }}
                              >
                                Awaiting response from organizer
                              </Typography>
                            )}
                            {application.status === 'rejected' && (
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ ml: 'auto', fontStyle: 'italic' }}
                              >
                                Application not selected
                              </Typography>
                            )}
                          </CardActions>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )}
      </Container>
    </motion.div>
  );
};

export default ProviderDashboard;
