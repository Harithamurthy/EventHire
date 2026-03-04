import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: '#1a2038',
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Overview */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              EventHire Tirupattur
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connecting local events with skilled professionals in Tirupattur district to create unforgettable experiences.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/services" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Services
              </Link>
              <Link href="/find-events" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Find Events
              </Link>
              <Link href="/post-event" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Post Event
              </Link>
              <Link href="/how-it-works" color="inherit" underline="hover" sx={{ mb: 1 }}>
                How It Works
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="/help" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Help Center
              </Link>
              <Link href="/terms" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Terms of Service
              </Link>
              <Link href="/privacy" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="/faq" color="inherit" underline="hover" sx={{ mb: 1 }}>
                FAQ
              </Link>
              <Link href="/contact" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">Tirupattur, Tamil Nadu, India</Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">+91 1234567890</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">info@eventhiretirupattur.com</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} EventHire Tirupattur. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
