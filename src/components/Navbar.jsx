import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container,
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png.png';

// Public navigation items (for non-authenticated users)
const publicNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' }
];

// Common navigation items
const commonNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' }
];

// Organizer-specific navigation items
const organizerNavItems = [
  { name: 'My Events', path: '/my-events' },
  { name: 'Post Event', path: '/post-event' },
  { name: 'Organizer Dashboard', path: '/organizer-dashboard' }
];

// Provider-specific navigation items
const providerNavItems = [
  { name: 'Find Events', path: '/find-events' },
  { name: 'My Applications', path: '/my-bookings' },
  { name: 'Provider Dashboard', path: '/provider-dashboard' }
];

// Get user menu items based on role
const getUserMenuItems = (role) => {
  const baseItems = [
    { name: 'Profile', path: '/profile' }
  ];
  
  // Add role-specific items
  if (role === 'provider') {
    baseItems.push(
      { name: 'My Applications', path: '/my-bookings' },
      { name: 'Provider Dashboard', path: '/provider-dashboard' }
    );
  } else {
    // Default to organizer
    baseItems.push(
      { name: 'My Events', path: '/my-events' },
      { name: 'Organizer Dashboard', path: '/organizer-dashboard' }
    );
  }
  
  // Always add logout
  baseItems.push({ name: 'Logout', path: '' });
  
  return baseItems;
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElHub, setAnchorElHub] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  
  // Get the appropriate navigation items based on authentication status and role
  const getNavItems = () => {
    if (!isAuthenticated) return publicNavItems;
    
    // Start with common items
    const navItems = [...commonNavItems];
    
    // Check current path to determine which role-specific items to show
    const currentPath = location.pathname;
    console.log('Navbar getNavItems: Current path:', currentPath);
    
    // Force provider role if we're on provider-related pages
    if (currentPath.includes('provider') || currentPath.includes('my-bookings') || currentPath.includes('find-events')) {
      console.log('Navbar getNavItems: On provider page, using provider navigation items');
      // Update localStorage to match the current page context
      localStorage.setItem('userRole', 'provider');
      navItems.push(...providerNavItems);
      return navItems;
    }
    
    // Force organizer role if we're on organizer-related pages
    if (currentPath.includes('organizer') || currentPath.includes('my-events') || currentPath.includes('post-event')) {
      console.log('Navbar getNavItems: On organizer page, using organizer navigation items');
      // Update localStorage to match the current page context
      localStorage.setItem('userRole', 'organizer');
      navItems.push(...organizerNavItems);
      return navItems;
    }
    
    // If not on a role-specific page, check localStorage
    const currentRole = localStorage.getItem('userRole');
    console.log('Navbar getNavItems: Current role from localStorage:', currentRole);
    
    // Add role-specific items based on localStorage
    if (currentRole === 'provider') {
      console.log('Navbar getNavItems: Using provider navigation items from localStorage');
      navItems.push(...providerNavItems);
    } else if (currentRole === 'organizer') {
      console.log('Navbar getNavItems: Using organizer navigation items from localStorage');
      navItems.push(...organizerNavItems);
    } else {
      // If no role is found, show minimal navigation
      console.log('Navbar getNavItems: No role found, using minimal navigation');
    }
    
    return navItems;
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    // Check for role in localStorage only if user is authenticated
    if (isAuthenticated) {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        console.log('Navbar: Setting user role from localStorage:', storedRole);
        setUserRole(storedRole);
      } else {
        // Don't default to any role if none is set - let the user select a role
        console.log('Navbar: No role found in localStorage');
        setUserRole(null);
      }
    } else {
      // Clear userRole when not authenticated
      setUserRole(null);
    }
  }, [isAuthenticated]);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleOpenHubMenu = (event) => {
    setAnchorElHub(event.currentTarget);
  };

  const handleCloseHubMenu = () => {
    setAnchorElHub(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingClick = (item) => {
    handleCloseUserMenu();
    
    if (item.name === 'Logout') {
      logout();
      // Clear user role when logging out
      localStorage.removeItem('userRole');
      setUserRole(null);
      navigate('/');
    } else if (item.name === 'Switch Role') {
      // Switch user role
      const newRole = userRole === 'organizer' ? 'provider' : 'organizer';
      localStorage.setItem('userRole', newRole);
      setUserRole(newRole);
      
      // Navigate to appropriate dashboard
      if (newRole === 'organizer') {
        navigate('/organizer-dashboard');
      } else {
        navigate('/provider-dashboard');
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#1976d2' }}>
        EventHire Tirupattur
      </Typography>
      <Divider />
      <List>
        {getNavItems().map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              sx={{ 
                textAlign: 'center',
                bgcolor: location.pathname === item.path ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                color: location.pathname === item.path ? '#1976d2' : 'inherit',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
              component={Link}
              to={item.path}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#333' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
  <img src={logo} alt="EventHire Logo" style={{ height: 36, marginRight: 8 }} />
  <Typography
    variant="h6"
    noWrap
    component={Link}
    to="/"
    sx={{
      fontWeight: 700,
      color: '#1976d2',
      textDecoration: 'none',
    }}
  >
    EventHire
  </Typography>
</Box>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Logo - Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 2, flexGrow: 1 }}>
  <img src={logo} alt="EventHire Logo" style={{ height: 32, marginRight: 6 }} />
  <Typography
    variant="h6"
    noWrap
    component={Link}
    to="/"
    sx={{
      fontWeight: 700,
      color: '#1976d2',
      textDecoration: 'none',
    }}
  >
    EventHire
  </Typography>
</Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {getNavItems().map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: location.pathname === item.path ? '#1976d2' : '#333', 
                  display: 'block',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  borderBottom: location.pathname === item.path ? '2px solid #1976d2' : 'none',
                  mx: 1
                }}
              >
                {item.name}
              </Button>
            ))}
            

          </Box>

          {/* User actions */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      borderRadius: 2,
                      minWidth: 200,
                      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {getUserMenuItems(userRole).map((item) => (
                    <MenuItem 
                      key={item.name} 
                      onClick={() => handleSettingClick(item)}
                      sx={{
                        py: 1.5,
                        '&:hover': { 
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Typography textAlign="center">
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: '#333', mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#115293',
                    }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
