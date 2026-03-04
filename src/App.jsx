import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import RoleSelectionTrigger from './components/RoleSelectionTrigger';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import ApplyEvent from './pages/ApplyEvent';
import ApplicationsView from './pages/ApplicationsView';
import CreateEvent from './pages/CreateEvent';
import ServicesList from './pages/ServicesList';
import ServiceDetail from './pages/ServiceDetail';
import UserProfile from './pages/UserProfile';
import MyEvents from './pages/MyEvents';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import HowItWorks from './pages/HowItWorks';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderDashboardRedirect from './pages/ProviderDashboardRedirect';
import RoleSelection from './pages/RoleSelection';
// Context
import { AuthProvider } from './context/AuthContext';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return localStorage.getItem('splashShown') !== 'true';
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('splashShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={5000} />
      
      <AuthProvider>
        <Router>
          <RoleSelectionTrigger />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="find-events" element={<EventList />} />
              <Route path="events/:eventId" element={<EventDetail />} />
              <Route path="apply/:eventId" element={<ApplyEvent />} />
              <Route path="applications" element={<ApplicationsView />} />
              <Route path="applications/:eventId" element={<ApplicationsView />} />
              <Route path="post-event" element={<CreateEvent />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/:serviceId" element={<ServiceDetail />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="organizer-dashboard" element={<OrganizerDashboard />} />
              <Route path="provider-dashboard" element={<ProviderDashboard />} />
              <Route path="go-to-provider" element={<ProviderDashboardRedirect />} />
              <Route path="role-selection" element={<RoleSelection />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="*" element={<NotFound />} />
              <Route path="splash-screen" element={<SplashScreen />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
