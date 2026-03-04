import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleSelector from './RoleSelector';

const RoleSelectorTrigger = () => {
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has already selected a role
    const userRole = localStorage.getItem('userRole');
    
    // Check if user is on the home page or dashboard pages
    const isHomePage = location.pathname === '/';
    const isDashboardPage = location.pathname.includes('dashboard');
    
    // Show role selector if:
    // 1. User hasn't selected a role before AND
    // 2. User is on home page OR trying to access a dashboard
    if (!userRole && (isHomePage || isDashboardPage)) {
      // Add a small delay to avoid immediate popup
      const timer = setTimeout(() => {
        setShowRoleSelector(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setShowRoleSelector(false);
  };

  return (
    <>
      {showRoleSelector && (
        <RoleSelector 
          open={showRoleSelector} 
          onClose={handleClose} 
        />
      )}
    </>
  );
};

export default RoleSelectorTrigger;
