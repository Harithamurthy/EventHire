import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real authentication with MongoDB backend
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Get selected role from session storage (if coming from role selection)
      const selectedRole = sessionStorage.getItem('selectedRole');
      
      // Save user role if available, otherwise use the role from URL parameter, session storage, or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role');
      
      // Determine which role to use (in order of priority)
      if (selectedRole) {
        // If there's a selected role in session storage, use that
        user.role = selectedRole;
        localStorage.setItem('userRole', selectedRole);
        console.log('Setting user role from session storage:', selectedRole);
        // Clear the selected role from session storage
        sessionStorage.removeItem('selectedRole');
      } else if (user && user.role) {
        // If the user has a role from the API, use that
        localStorage.setItem('userRole', user.role);
        console.log('Setting user role from API:', user.role);
      } else if (roleParam) {
        // If there's a role parameter in the URL, use that
        user.role = roleParam;
        localStorage.setItem('userRole', roleParam);
        console.log('Setting user role from URL parameter:', roleParam);
      } else {
        // Check if there's a role in localStorage
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
          user.role = storedRole;
          console.log('Using existing role from localStorage:', storedRole);
        } else {
          // Don't set a default role - user will be redirected to role selection
          user.role = null;
          console.log('No role found - user will be directed to role selection');
        }
      }
      
      // Set current user
      setCurrentUser(user);
      
      toast.success('Login successful');
      
      // Handle redirection based on role
      handleRoleRedirection(user.role);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Save user role if available
      if (user && user.role) {
        localStorage.setItem('userRole', user.role);
      }
      
      // Set current user
      setCurrentUser(user);
      
      toast.success('Registration successful');
      
      // Handle redirection based on role
      handleRoleRedirection(user.role);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // For now, we'll keep a simplified Google sign-in mock
  // This would be replaced with actual Google OAuth integration later
  const googleSignIn = () => {
    return new Promise((resolve, reject) => {
      // Mock Google sign-in for demonstration
      setTimeout(() => {
        // Don't default to organizer role - let the user select a role if none exists
        const userRole = localStorage.getItem('userRole');
        console.log('Google sign-in: Current role in localStorage:', userRole);
        
        const mockUser = {
          id: 'google-user-123',
          name: 'Google User',
          email: 'google.user@example.com',
          role: userRole || null
        };
        
        // Set current user
        setCurrentUser(mockUser);
        
        // Save token to localStorage
        localStorage.setItem('token', 'mock-google-token');
        
        // Only save role if it exists and is valid
        if (userRole && (userRole === 'provider' || userRole === 'organizer')) {
          console.log('Google sign-in: Saving valid role to localStorage:', userRole);
          localStorage.setItem('userRole', userRole);
          
          // Handle redirection based on role
          handleRoleRedirection(userRole);
        } else {
          console.log('Google sign-in: No valid role found, user will be directed to role selection');
          // If no role is found, show role selection dialog
          // This will be handled in the Login component
        }
        
        toast.success('Google sign-in successful');
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Clear current user
    setCurrentUser(null);
    
    toast.info('Logged out successfully');
    return Promise.resolve();
  };

  // Check for authentication state on load
  useEffect(() => {
    const checkAuthState = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token by getting user profile
          const response = await authAPI.getProfile();
          setCurrentUser(response.data.data);
          console.log('User authenticated from token:', response.data.data);
        } catch (error) {
          console.error('Auth state check error:', error);
          // If token is invalid, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
        }
      } else {
        console.log('No authentication token found');
      }
      
      setLoading(false);
    };

    checkAuthState();
  }, []);

  // Update user role in localStorage when it changes
  useEffect(() => {
    if (currentUser && currentUser.role) {
      localStorage.setItem('userRole', currentUser.role);
    }
  }, [currentUser]);

  // Update user role
  const updateRole = async (role) => {
    try {
      setLoading(true);
      const response = await authAPI.updateRole(role);
      setCurrentUser(response.data.data);
      localStorage.setItem('userRole', role);
      toast.success(`Role updated to ${role}`);
      
      // Handle redirection based on role
      handleRoleRedirection(role);
      
      return response.data.data;
    } catch (error) {
      console.error('Role update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update role');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to handle redirection based on role
  const handleRoleRedirection = (role) => {
    // IMPORTANT: Always check if the role is explicitly 'provider' or 'organizer'
    // Never default to any role
    if (role === 'provider') {
      console.log('Redirecting to provider dashboard - EXPLICIT PROVIDER ROLE');
      // Clear any session storage to avoid conflicts
      sessionStorage.removeItem('selectedRole');
      // Force a small delay to ensure localStorage is properly updated
      setTimeout(() => {
        window.location.href = '/provider-dashboard';
      }, 100);
      return;
    } 
    
    if (role === 'organizer') {
      console.log('Redirecting to organizer dashboard - EXPLICIT ORGANIZER ROLE');
      // Clear any session storage to avoid conflicts
      sessionStorage.removeItem('selectedRole');
      // Force a small delay to ensure localStorage is properly updated
      setTimeout(() => {
        window.location.href = '/organizer-dashboard';
      }, 100);
      return;
    }
    
    // If we get here, the role is either null, undefined, or invalid
    console.log('No valid role found, redirecting to role selection');
    // Clear any potentially invalid role
    localStorage.removeItem('userRole');
    // Redirect to role selection
    window.location.href = '/role-selection';
  };

  const value = {
    currentUser,
    login,
    register,
    googleSignIn,
    logout,
    updateRole,
    loading,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
