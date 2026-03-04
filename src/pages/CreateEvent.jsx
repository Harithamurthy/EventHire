import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, TextField, Button, Grid,
  MenuItem, FormControl, InputLabel, Select, Stepper, Step, StepLabel,
  Card, Chip, Divider, Avatar, Tooltip, CircularProgress, Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { eventAPI } from '../services/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    date: '',
    time: '12:00',
    budget: '',
    requirements: '',
    contactEmail: currentUser?.email || '',
    contactPhone: ''
  });
  const [errors, setErrors] = useState({});

  const steps = ['Basic Info', 'Event Details', 'Review'];

  const categories = [
    'Photography', 'Videography', 'Catering', 'Music & DJ',
    'Decoration', 'Event Planning', 'Venue'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.description) newErrors.description = 'Description is required';
    } else if (activeStep === 1) {
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.budget) newErrors.budget = 'Budget is required';
      if (!formData.requirements) newErrors.requirements = 'Requirements are required';
      if (!formData.contactEmail) newErrors.contactEmail = 'Email is required';
      if (!formData.contactPhone) newErrors.contactPhone = 'Phone is required';
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email address';
      }
      
      // Validate phone number format
      const phoneRegex = /^[0-9]{10}$/;
      if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
        newErrors.contactPhone = 'Please enter a valid 10-digit phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare event data for API
      const eventData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        time: formData.time || '12:00', // Default time if not provided
        budget: formData.budget,
        requirements: formData.requirements.split(',').map(req => req.trim()), // Convert to array
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        organizer: currentUser?._id, // Add organizer ID
        // Default image URL will be used from the backend
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
      };
      
      // Call the API to create the event
      const response = await eventAPI.createEvent(eventData);
      
      console.log('Event created:', response.data);
      toast.success('Event created successfully!');
      
      // Redirect to My Events page
      navigate('/my-events');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error.response?.data?.message || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Please login to create an event</Typography>
          <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  sx={{ borderRadius: 2 }}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
                placeholder="Describe your event requirements in detail to attract the right professionals"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail || 'This email will be visible to service providers'}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#1976d2' }} />
                }}
                placeholder="e.g. Tirupattur, Tamil Nadu"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Event Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: { borderRadius: 2 },
                    startAdornment: <DateRangeIcon sx={{ mr: 1, color: '#1976d2' }} />
                  }}
                />
                <TextField
                  sx={{ width: '40%' }}
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                error={!!errors.budget}
                helperText={errors.budget}
                placeholder="e.g. ₹15,000-20,000"
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: '#1976d2' }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements"
                name="requirements"
                multiline
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                error={!!errors.requirements}
                helperText={errors.requirements}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
                placeholder="List specific requirements for service providers (equipment, experience level, etc.)"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, mt: 1 }}>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail || 'This email will be visible to service providers'}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Event Preview</Typography>
            
            <Card sx={{ mb: 4, overflow: 'hidden', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                A default event image will be assigned to your event. You can change it later from your dashboard.
              </Alert>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {formData.title}
                  </Typography>
                  <Chip 
                    label={formData.category} 
                    sx={{ 
                      bgcolor: '#1976d2', 
                      color: 'white',
                      fontWeight: 500 
                    }} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DateRangeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.date}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" paragraph>
                  {formData.description}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Requirements
                </Typography>
                <Typography variant="body2" paragraph>
                  {formData.requirements}
                </Typography>
                
                <Box sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)', p: 2, borderRadius: 2, mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Budget
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                    {formData.budget}
                  </Typography>
                </Box>
              </Box>
              
              <Divider />
              
              <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.02)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40, mr: 2 }}>
                    {currentUser?.displayName?.charAt(0) || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">
                      {formData.contactEmail}
                    </Typography>
                    <Typography variant="body2">
                      {formData.contactPhone}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
            
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Your event will be visible to all service providers in the selected category. You'll receive notifications when professionals apply to your event.
            </Alert>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>
            Create New Event
          </Typography>
          
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-root .Mui-completed': {
                color: '#4caf50', // custom color for completed steps
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: '#1976d2', // custom color for active step
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <Button 
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  disabled={loading}
                  sx={{ 
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Create Event'
                  )}
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default CreateEvent;
