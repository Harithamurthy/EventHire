import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Chip,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ApplicationForm = ({ event, onSubmit, onCancel }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    availability: 'yes',
    price: '',
    message: '',
    portfolio: null,
    portfolioName: '',
    profilePicture: ''
  });

  const steps = ['Basic Information', 'Professional Details', 'Review & Submit'];

  // Load user profile data from localStorage when component mounts
  useEffect(() => {
    // Try to get user profile data from localStorage
    const userProfileData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
    
    // If there's profile data, pre-fill the form
    if (userProfileData) {
      setFormData(prevData => ({
        ...prevData,
        fullName: userProfileData.name || prevData.fullName,
        email: userProfileData.email || prevData.email,
        phone: userProfileData.phone || prevData.phone,
        profilePicture: userProfileData.profilePicture || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        portfolio: file,
        portfolioName: file.name
      });
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event propagation
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSubmit) onSubmit(formData);
    }, 1500);
    
    return false; // Ensure no redirection happens
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return formData.fullName && formData.email && formData.phone;
    } else if (activeStep === 1) {
      return formData.experience && formData.price;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#9c27b0', fontWeight: 600, mb: 3 }}>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#9c27b0', fontWeight: 600, mb: 3 }}>
              Professional Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Experience"
                  name="experience"
                  placeholder="Describe your relevant experience"
                  value={formData.experience}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend" sx={{ color: 'text.secondary' }}>
                    Are you available on {event?.date}?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="maybe" control={<Radio />} label="Need to check" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Your Price Quote"
                  name="price"
                  placeholder="e.g. ₹15,000"
                  value={formData.price}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ 
                    height: '100%', 
                    width: '100%',
                    borderColor: formData.portfolio ? '#4caf50' : undefined,
                    color: formData.portfolio ? '#4caf50' : undefined
                  }}
                >
                  {formData.portfolio ? 'Portfolio Uploaded' : 'Upload Portfolio/Samples'}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              {formData.portfolioName && (
                <Grid item xs={12}>
                  <Chip 
                    label={formData.portfolioName} 
                    onDelete={() => setFormData({...formData, portfolio: null, portfolioName: ''})}
                    color="primary"
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#9c27b0', fontWeight: 600, mb: 3 }}>
              Additional Message (Optional)
            </Typography>
            <TextField
              fullWidth
              label="Message to Event Organizer"
              name="message"
              placeholder="Add any additional information or questions"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 4 }}
            />
            
            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Application Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.email} | {formData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Price Quote:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.price}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Availability:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.availability === 'yes' ? 'Available' : 
                     formData.availability === 'no' ? 'Not Available' : 'Need to check'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Portfolio:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.portfolioName || 'Not provided'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <Box 
        component={Paper} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          borderTop: '4px solid #4caf50',
          borderRadius: 2
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
        </motion.div>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#4caf50' }}>
          Application Submitted Successfully!
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Your application for "{event?.title}" has been submitted. The event organizer will review your application and contact you soon.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onCancel}
          sx={{ 
            px: 4,
            bgcolor: '#9c27b0',
            '&:hover': { bgcolor: '#7b1fa2' }
          }}
        >
          Back to Event
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      component={Paper} 
      sx={{ 
        p: 4, 
        borderTop: '4px solid #9c27b0',
        borderRadius: 2,
        mb: 4
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#9c27b0', fontWeight: 600 }}>
        Apply for "{event?.title}"
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Complete the form below to apply for this event opportunity.
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit} noValidate>
        {renderStepContent()}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={onCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Box>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid()}
                sx={{ 
                  bgcolor: '#9c27b0',
                  '&:hover': { bgcolor: '#7b1fa2' },
                  '&.Mui-disabled': { bgcolor: '#e1bee7', color: 'rgba(0, 0, 0, 0.26)' }
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit} // Use onClick instead of type="submit"
                variant="contained"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{ 
                  bgcolor: '#9c27b0',
                  '&:hover': { bgcolor: '#7b1fa2' }
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ApplicationForm;
