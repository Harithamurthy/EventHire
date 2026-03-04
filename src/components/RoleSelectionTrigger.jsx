import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleSelectionDialog from './RoleSelectionDialog';
import { useAuth } from '../context/AuthContext';

const RoleSelectionTrigger = () => {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated but has no role
    if (isAuthenticated) {
      const userRole = localStorage.getItem('userRole');
      console.log('RoleSelectionTrigger: Checking for user role, found:', userRole);
      
      // If no role is found, show the role selection dialog
      if (!userRole) {
        console.log('RoleSelectionTrigger: No role found, showing dialog');
        setShowRoleDialog(true);
      }
    }
  }, [isAuthenticated, location.pathname]);

  // Handle role selection
  const handleRoleSelect = (role) => {
    console.log('RoleSelectionTrigger: Role selected:', role);
    
    // Store the selected role in localStorage
    localStorage.setItem('userRole', role);
    
    // Close the dialog
    setShowRoleDialog(false);
    
    // Force a small delay to ensure localStorage is updated
    setTimeout(() => {
      // Navigate to the appropriate dashboard
      if (role === 'provider') {
        console.log('RoleSelectionTrigger: Redirecting to provider dashboard');
        window.location.href = '/provider-dashboard';
      } else if (role === 'organizer') {
        console.log('RoleSelectionTrigger: Redirecting to organizer dashboard');
        window.location.href = '/organizer-dashboard';
      } else {
        console.log('RoleSelectionTrigger: Unknown role, redirecting to role selection');
        window.location.href = '/role-selection';
      }
    }, 100);
  };

  return (
    <>
      <RoleSelectionDialog 
        open={showRoleDialog} 
        onClose={() => setShowRoleDialog(false)}
        onSelectRole={handleRoleSelect}
      />
    </>
  );
};

export default RoleSelectionTrigger;
