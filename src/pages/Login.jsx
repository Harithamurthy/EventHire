import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import RoleSelectionDialog from '../components/RoleSelectionDialog';

const Login = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const user = await login(email, password);
      console.log('Login successful, user:', user);
      
      // Check if there's a redirect destination and selected role after login
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      const selectedRole = sessionStorage.getItem('selectedRole');
      console.log('Redirect path:', redirectPath, 'Selected role:', selectedRole);
      
      // If coming from provider dashboard redirect
      if (redirectPath === '/provider-dashboard' && selectedRole === 'provider') {
        console.log('Coming from provider dashboard redirect, setting provider role');
        localStorage.setItem('userRole', 'provider');
        sessionStorage.removeItem('selectedRole');
        sessionStorage.removeItem('redirectAfterLogin');
        
        // Redirect to provider dashboard
        console.log('Redirecting to provider dashboard');
        window.location.href = '/provider-dashboard';
        return;
      }
      
      // For all other cases, show the role selection dialog
      setShowRoleDialog(true);
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const user = await googleSignIn();
      console.log('Google sign-in successful, user:', user);
      
      // Force redirect to dashboard based on role in localStorage
      const userRole = localStorage.getItem('userRole');
      console.log('User role from localStorage:', userRole);
      
      // Check if there's a redirect destination after login
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      console.log('Redirect path from sessionStorage:', redirectPath);
      
      if (redirectPath) {
        console.log('Redirecting to:', redirectPath);
        sessionStorage.removeItem('redirectAfterLogin');
        // Use window.location for more reliable navigation
        window.location.href = redirectPath;
        return;
      }
      
      // Check if there was a role selected before login
      const selectedRole = sessionStorage.getItem('selectedRole');
      console.log('Selected role from sessionStorage:', selectedRole);
      
      if (selectedRole) {
        console.log('Using selected role from sessionStorage:', selectedRole);
        // Clear any existing role first to avoid conflicts
        localStorage.removeItem('userRole');
        
        // Set the selected role
        localStorage.setItem('userRole', selectedRole);
        sessionStorage.removeItem('selectedRole');
        
        // Navigate to appropriate dashboard using window.location with a small delay
        setTimeout(() => {
          if (selectedRole === 'provider') {
            console.log('Redirecting to provider dashboard');
            window.location.href = '/provider-dashboard';
          } else if (selectedRole === 'organizer') {
            console.log('Redirecting to organizer dashboard');
            window.location.href = '/organizer-dashboard';
          } else {
            console.log('Unknown role, redirecting to role selection');
            window.location.href = '/role-selection';
          }
        }, 100);
        return;
      }
      
      // Use the role from localStorage or user object
      if (userRole) {
        console.log('Using role from localStorage:', userRole);
        // If user has a role, navigate to appropriate dashboard
        // Force a small delay to ensure localStorage is properly updated
        setTimeout(() => {
          if (userRole === 'provider') {
            console.log('Redirecting to provider dashboard');
            window.location.href = '/provider-dashboard';
          } else if (userRole === 'organizer') {
            console.log('Redirecting to organizer dashboard');
            window.location.href = '/organizer-dashboard';
          } else {
            // If role is not recognized, go to role selection
            console.log('Redirecting to role selection');
            window.location.href = '/role-selection';
          }
        }, 100);
      } else {
        // If no role is found, show role selection dialog
        setShowRoleDialog(true);
      } 
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle role selection from dialog
  const handleRoleSelect = (role) => {
    console.log('Role selected in Login component:', role);
    
    // Clear any existing role first to avoid conflicts
    localStorage.removeItem('userRole');
    
    // Store the selected role in localStorage
    localStorage.setItem('userRole', role);
    
    // Close the dialog
    setShowRoleDialog(false);
    
    // Force a small delay to ensure localStorage is updated
    setTimeout(() => {
      // Navigate to the appropriate dashboard with explicit role handling
      if (role === 'provider') {
        console.log('Redirecting to provider dashboard');
        window.location.href = '/provider-dashboard';
      } else if (role === 'organizer') {
        console.log('Redirecting to organizer dashboard');
        window.location.href = '/organizer-dashboard';
      } else {
        console.log('Unknown role, redirecting to role selection');
        window.location.href = '/role-selection';
      }
    }, 100);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      {/* Role Selection Dialog */}
      <RoleSelectionDialog 
        open={showRoleDialog} 
        onClose={() => setShowRoleDialog(false)}
        onSelectRole={handleRoleSelect}
      />

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
              Welcome Back
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                sx={{ mb: 3 }}
              />
              
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  py: 1.5, 
                  mb: 2,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#115293',
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
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
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Sign up
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

export default Login;
