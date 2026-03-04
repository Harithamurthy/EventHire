import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProviderDashboardRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Set the role as provider in session storage for after login
    sessionStorage.setItem('selectedRole', 'provider');
    
    // Store the intended destination to redirect back after login
    sessionStorage.setItem('redirectAfterLogin', '/provider-dashboard');
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login with provider role set');
      navigate('/login');
    } else {
      // If already authenticated, set role and redirect
      console.log('Already authenticated, setting provider role and redirecting');
      localStorage.setItem('userRole', 'provider');
      navigate('/provider-dashboard');
    }
  }, [isAuthenticated, navigate]);

  return null; // This component doesn't render anything
};

export default ProviderDashboardRedirect;
