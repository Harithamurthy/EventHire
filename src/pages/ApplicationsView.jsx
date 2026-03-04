import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Rating,
  CircularProgress,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../context/AuthContext';

const ApplicationsView = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', id: null });
  const [messageDialog, setMessageDialog] = useState({ open: false, id: null });
  const [message, setMessage] = useState('');

  // Mock data for applications
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
      phone: '+91 9876543210',
      email: 'rahul.sharma@example.com',
      portfolio: 'https://rahulsharma-portfolio.example.com',
      message: 'I specialize in candid wedding photography with a focus on capturing authentic moments. I have shot over 50 weddings in the past 5 years and can provide a team of 3 photographers for your event.',
      rating: 4.7,
      completedJobs: 42
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
      phone: '+91 9876543211',
      email: 'priya.patel@example.com',
      portfolio: 'https://priyapatel-photography.example.com',
      message: 'I have extensive experience in traditional Tamil wedding photography. My package includes pre-wedding photoshoot, all ceremony coverage, and a premium photo album with 100 edited photos.',
      rating: 4.9,
      completedJobs: 68
    },
    {
      id: 3,
      eventId: 1,
      eventTitle: 'Wedding Photography Needed',
      applicantName: 'Vikram Studios',
      applicantImage: 'https://randomuser.me/api/portraits/men/45.jpg',
      experience: '10 years',
      price: '₹25,000',
      status: 'accepted',
      date: 'April 25, 2025',
      phone: '+91 9876543212',
      email: 'vikram@vikramstudios.com',
      portfolio: 'https://vikramstudios.example.com',
      message: 'Our team of 5 photographers can provide comprehensive coverage of your wedding. We offer drone photography, same-day edits, and a beautiful wedding film as part of our premium package.',
      rating: 4.8,
      completedJobs: 120
    },
    {
      id: 4,
      eventId: 1,
      eventTitle: 'Wedding Photography Needed',
      applicantName: 'Creative Captures',
      applicantImage: 'https://randomuser.me/api/portraits/women/28.jpg',
      experience: '4 years',
      price: '₹16,500',
      status: 'rejected',
      date: 'April 26, 2025',
      phone: '+91 9876543213',
      email: 'info@creativecaptures.com',
      portfolio: 'https://creativecaptures.example.com',
      message: 'We specialize in modern wedding photography with artistic touches. Our package includes 8 hours of coverage, 300 edited photos, and a custom-designed photo book.',
      rating: 4.5,
      completedJobs: 35
    }
  ];

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      // Store the role as organizer for login redirection
      sessionStorage.setItem('selectedRole', 'organizer');
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    // Simulate API call to fetch applications
    setLoading(true);
    setTimeout(() => {
      // Get applications from localStorage if available
      const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
      
      // Combine mock applications with stored applications
      const allApplications = [...mockApplications];
      
      // Add stored applications if they don't already exist in mock data
      storedApplications.forEach(storedApp => {
        // Convert stored application to match the format of mock applications
        const formattedApp = {
          id: storedApp._id,
          eventId: storedApp.eventId,
          eventTitle: storedApp.eventTitle,
          applicantName: storedApp.applicantName,
          applicantImage: storedApp.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg', // Use profile picture if available, otherwise default
          experience: '2+ years',
          price: storedApp.price || '₹15,000',
          status: storedApp.status || 'pending',
          date: new Date(storedApp.createdAt).toLocaleDateString(),
          phone: storedApp.applicantPhone,
          email: storedApp.applicantEmail,
          portfolio: 'https://portfolio.example.com',
          message: storedApp.message || 'I am interested in providing my services for your event.',
          rating: 4.5,
          completedJobs: 15
        };
        
        // Check if this application is already in the mock data
        const exists = allApplications.some(app => app.id === formattedApp.id);
        if (!exists) {
          allApplications.push(formattedApp);
        }
      });
      
      // Filter applications by eventId if provided
      const filteredApps = eventId 
        ? allApplications.filter(app => app.eventId.toString() === eventId)
        : allApplications;
      
      setApplications(filteredApps);
      setLoading(false);
    }, 1000);
  }, [eventId, navigate]);

  const handleFilterChange = (event, newValue) => {
    setFilterStatus(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800';
      case 'accepted':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseApplicationView = () => {
    setSelectedApplication(null);
  };

  const handleOpenConfirmDialog = (type, id) => {
    setConfirmDialog({ open: true, type, id });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ open: false, type: '', id: null });
  };

  const handleOpenMessageDialog = (id) => {
    setMessageDialog({ open: true, id });
  };

  const handleCloseMessageDialog = () => {
    setMessageDialog({ open: false, id: null });
    setMessage('');
  };

  const handleAcceptApplication = (id) => {
    // In a real app, you would call an API to update the application status
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status: 'accepted' } : app
    );
    setApplications(updatedApplications);
    handleCloseConfirmDialog();
    
    // If we're viewing the application details, update that too
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: 'accepted' });
    }
    
    // Update the application status in localStorage so it reflects for the service provider
    const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
    const updatedStoredApplications = storedApplications.map(app => {
      // Match by id or _id depending on how it's stored
      if (app._id === id || app.id === id) {
        return { ...app, status: 'accepted' };
      }
      return app;
    });
    
    // Save back to localStorage
    localStorage.setItem('myApplications', JSON.stringify(updatedStoredApplications));
    console.log('Application accepted and updated in localStorage');
  };

  const handleRejectApplication = (id) => {
    // In a real app, you would call an API to update the application status
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    );
    setApplications(updatedApplications);
    handleCloseConfirmDialog();
    
    // If we're viewing the application details, update that too
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: 'rejected' });
    }
    
    // Update the application status in localStorage so it reflects for the service provider
    const storedApplications = JSON.parse(localStorage.getItem('myApplications') || '[]');
    const updatedStoredApplications = storedApplications.map(app => {
      // Match by id or _id depending on how it's stored
      if (app._id === id || app.id === id) {
        return { ...app, status: 'rejected' };
      }
      return app;
    });
    
    // Save back to localStorage
    localStorage.setItem('myApplications', JSON.stringify(updatedStoredApplications));
    console.log('Application rejected and updated in localStorage');
  };

  const handleSendMessage = () => {
    // In a real app, you would call an API to send the message
    console.log('Sending message to applicant ID:', messageDialog.id);
    console.log('Message:', message);
    
    // Close the dialog and reset the message
    handleCloseMessageDialog();
    
    // Show a success message (in a real app)
    alert('Message sent successfully!');
  };

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="secondary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading applications...
        </Typography>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/organizer-dashboard')}
            sx={{ mr: 2 }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {eventId ? `Applications for ${applications[0]?.eventTitle}` : 'All Applications'}
          </Typography>
        </Box>

        {applications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No applications found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {eventId 
                ? "You haven't received any applications for this event yet." 
                : "You haven't received any applications yet."}
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/post-event"
              sx={{ 
                mt: 2,
                bgcolor: '#9c27b0',
                '&:hover': { bgcolor: '#7b1fa2' }
              }}
            >
              Post a New Event
            </Button>
          </Paper>
        ) : (
          <>
            <Paper sx={{ mb: 4 }}>
              <Tabs
                value={filterStatus}
                onChange={handleFilterChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
              >
                <Tab label="All Applications" value="all" />
                <Tab label="Pending" value="pending" />
                <Tab label="Accepted" value="accepted" />
                <Tab label="Rejected" value="rejected" />
              </Tabs>
            </Paper>

            <Grid container spacing={3}>
              {filteredApplications.map((application) => (
                <Grid item xs={12} md={6} key={application.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderLeft: `4px solid ${getStatusColor(application.status)}`,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={application.applicantImage} 
                            alt={application.applicantName}
                            sx={{ width: 56, height: 56 }}
                          />
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {application.applicantName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={application.rating} precision={0.1} readOnly size="small" />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                ({application.rating})
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Chip 
                          label={application.status} 
                          sx={{ 
                            bgcolor: getStatusColor(application.status),
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }} 
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WorkIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Experience: {application.experience}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AttachMoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Price: {application.price}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Applied: {application.date}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Completed: {application.completedJobs} jobs
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mt: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {application.message}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleViewApplication(application)}
                        >
                          View Details
                        </Button>
                        
                        <Box>
                          {application.status === 'pending' ? (
                            <>
                              <IconButton 
                                color="success"
                                onClick={() => handleOpenConfirmDialog('accept', application.id)}
                                sx={{ mr: 1 }}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                              <IconButton 
                                color="error"
                                onClick={() => handleOpenConfirmDialog('reject', application.id)}
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<MessageIcon />}
                              onClick={() => handleOpenMessageDialog(application.id)}
                              sx={{ 
                                bgcolor: '#9c27b0',
                                '&:hover': { bgcolor: '#7b1fa2' }
                              }}
                            >
                              Message
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Application Detail Dialog */}
        <Dialog
          open={selectedApplication !== null}
          onClose={handleCloseApplicationView}
          maxWidth="md"
          fullWidth
        >
          {selectedApplication && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    Application Details
                  </Typography>
                  <Chip 
                    label={selectedApplication.status} 
                    sx={{ 
                      bgcolor: getStatusColor(selectedApplication.status),
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }} 
                  />
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar 
                        src={selectedApplication.applicantImage} 
                        alt={selectedApplication.applicantName}
                        sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {selectedApplication.applicantName}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Rating value={selectedApplication.rating} precision={0.1} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({selectedApplication.rating})
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {selectedApplication.completedJobs} jobs completed
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Experience: {selectedApplication.experience}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      Applied for: {selectedApplication.eventTitle}
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#f3e5f5' }}>
                            <PhoneIcon sx={{ color: '#9c27b0' }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Phone"
                          secondary={selectedApplication.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#f3e5f5' }}>
                            <EmailIcon sx={{ color: '#9c27b0' }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Email"
                          secondary={selectedApplication.email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#f3e5f5' }}>
                            <AttachMoneyIcon sx={{ color: '#9c27b0' }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Price Quote"
                          secondary={selectedApplication.price}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#f3e5f5' }}>
                            <CalendarTodayIcon sx={{ color: '#9c27b0' }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Application Date"
                          secondary={selectedApplication.date}
                        />
                      </ListItem>
                    </List>
                    
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        Message from Applicant:
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2">
                          {selectedApplication.message}
                        </Typography>
                      </Paper>
                    </Box>
                    
                    {selectedApplication.portfolio && (
                      <Button
                        variant="outlined"
                        href={selectedApplication.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 3 }}
                      >
                        View Portfolio
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
                <Button onClick={handleCloseApplicationView}>
                  Close
                </Button>
                <Box>
                  {selectedApplication.status === 'pending' ? (
                    <>
                      <Button 
                        variant="contained" 
                        color="error"
                        onClick={() => handleOpenConfirmDialog('reject', selectedApplication.id)}
                        sx={{ mr: 2 }}
                      >
                        Reject
                      </Button>
                      <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => handleOpenConfirmDialog('accept', selectedApplication.id)}
                      >
                        Accept
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<MessageIcon />}
                      onClick={() => handleOpenMessageDialog(selectedApplication.id)}
                      sx={{ 
                        bgcolor: '#9c27b0',
                        '&:hover': { bgcolor: '#7b1fa2' }
                      }}
                    >
                      Message Applicant
                    </Button>
                  )}
                </Box>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialog.open}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>
            {confirmDialog.type === 'accept' ? 'Accept Application' : 'Reject Application'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {confirmDialog.type === 'accept' 
                ? 'Are you sure you want to accept this application? This will notify the service provider that they have been selected for your event.'
                : 'Are you sure you want to reject this application? This will notify the service provider that they have not been selected for your event.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color={confirmDialog.type === 'accept' ? 'success' : 'error'}
              onClick={() => {
                if (confirmDialog.type === 'accept') {
                  handleAcceptApplication(confirmDialog.id);
                } else {
                  handleRejectApplication(confirmDialog.id);
                }
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Message Dialog */}
        <Dialog
          open={messageDialog.open}
          onClose={handleCloseMessageDialog}
          fullWidth
        >
          <DialogTitle>Send Message to Applicant</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Send a message to the applicant regarding your event. They will be notified via email.
            </DialogContentText>
            <TextField
              autoFocus
              multiline
              rows={4}
              label="Your Message"
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{ 
                bgcolor: '#9c27b0',
                '&:hover': { bgcolor: '#7b1fa2' }
              }}
            >
              Send Message
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </motion.div>
  );
};

export default ApplicationsView;
