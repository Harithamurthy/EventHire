import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import RoleSelectionDialog from '../components/RoleSelectionDialog';

const Register = () => {
  const navigate = useNavigate();
  const { register, googleSignIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const user = await register(formData);
      
      // Check if there's a redirect destination after registration
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
        return;
      }
      
      // Check if user already has a role from the API response or localStorage
      const userRole = user?.role || localStorage.getItem('userRole');
      
      if (userRole) {
        // If user has a role, navigate to appropriate dashboard
        if (userRole === 'organizer') {
          navigate('/organizer-dashboard');
        } else if (userRole === 'provider') {
          navigate('/provider-dashboard');
        } else {
          // If role is not recognized, go to role selection
          navigate('/role-selection');
        }
      } else {
        // Navigate to role selection page if no role is found
        navigate('/role-selection');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const user = await googleSignIn();
      
      // Check if there's a redirect destination after login
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
        return;
      }
      
      // Check if user already has a role from the API response or localStorage
      const userRole = user?.role || localStorage.getItem('userRole');
      
      if (userRole) {
        // If user has a role, navigate to appropriate dashboard
        if (userRole === 'organizer') {
          navigate('/organizer-dashboard');
        } else if (userRole === 'provider') {
          navigate('/provider-dashboard');
        } else {
          // If role is not recognized, go to role selection
          navigate('/role-selection');
        }
      } else {
        // Navigate to role selection page if no role is found
        navigate('/role-selection');
      }
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            mt: 8,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Create an Account
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    placeholder="10-digit phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="agreeToTerms" 
                        color="primary" 
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{' '}
                        <Link to="/terms" style={{ textDecoration: 'none', color: '#1976d2' }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" style={{ textDecoration: 'none', color: '#1976d2' }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  py: 1.5, 
                  mt: 3,
                  mb: 2,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#115293',
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              
              <Divider sx={{ my: 2 }}>OR</Divider>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{ 
                  py: 1.5, 
                  mb: 2,
                  color: '#757575',
                  borderColor: '#757575',
                  '&:hover': {
                    borderColor: '#424242',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
                disabled={loading}
              >
                Continue with Google
              </Button>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
