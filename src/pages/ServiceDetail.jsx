import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia,
  Button, Avatar, Rating, Divider, Chip, List, ListItem, ListItemText,
  Paper, Tabs, Tab
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';

// Mock data for service category
const serviceData = {
  id: 1,
  title: 'Photography',
  description: 'Professional photographers for weddings, events, and portraits in Tirupattur.',
  image: 'https://source.unsplash.com/random/1200x800/?photography',
  providers: 12,
  rating: 4.8,
  requirements: [
    'Professional DSLR cameras',
    'Multiple lenses for different scenarios',
    'Lighting equipment',
    'Backup equipment',
    'Quick turnaround times'
  ],
  faqs: [
    {
      question: 'How far in advance should I book?',
      answer: 'For weddings, 2-3 months in advance. For smaller events, 2-4 weeks notice is usually sufficient.'
    },
    {
      question: 'What is included in a package?',
      answer: 'Usually includes set hours of coverage, edited digital photos, and sometimes prints or albums.'
    }
  ]
};

// Mock data for providers
const serviceProviders = [
  {
    id: 101,
    name: 'Rahul Photography',
    avatar: 'https://source.unsplash.com/random/100x100/?man',
    rating: 4.9,
    reviews: 28,
    location: 'Tirupattur Central',
    image: 'https://source.unsplash.com/random/800x600/?wedding',
    verified: true,
    specializations: ['Wedding', 'Portrait', 'Event']
  },
  {
    id: 102,
    name: 'Priya\'s Studio',
    avatar: 'https://source.unsplash.com/random/100x100/?woman',
    rating: 4.7,
    reviews: 19,
    location: 'South Tirupattur',
    image: 'https://source.unsplash.com/random/800x600/?portrait',
    verified: true,
    specializations: ['Portrait', 'Fashion', 'Product']
  }
];

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setService(serviceData);
        setProviders(serviceProviders);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, [serviceId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading service details...</Typography>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Service not found</Typography>
        <Button component={Link} to="/services" variant="contained" sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ position: 'relative', height: { xs: '300px', md: '400px' }, overflow: 'hidden', mb: 4 }}>
        <Box
          component="img"
          src={service.image}
          alt={service.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            p: { xs: 3, md: 5 }
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
              {service.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating value={service.rating} readOnly precision={0.1} sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ mr: 2 }}>
                {service.rating.toFixed(1)}
              </Typography>
              <Typography variant="body1">
                ({service.providers} Providers)
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Overview" />
                  <Tab label="Requirements" />
                  <Tab label="FAQs" />
                </Tabs>
              </Box>

              {tabValue === 0 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    About {service.title} Services
                  </Typography>
                  <Typography paragraph>
                    {service.description} Our listed photographers capture your special moments with creativity and precision. They specialize in various styles including traditional, candid, and contemporary photography.
                  </Typography>
                  <Typography paragraph>
                    They use top-quality equipment and editing techniques to deliver stunning images that will help you cherish your memories for years to come. Whether you need coverage for a wedding, birthday party, corporate event, or family portrait session, you can find the right professional here.
                  </Typography>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Standard Requirements
                  </Typography>
                  <List>
                    {service.requirements.map((requirement, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={requirement} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Frequently Asked Questions
                  </Typography>
                  {service.faqs.map((faq, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        {faq.question}
                      </Typography>
                      <Typography paragraph>
                        {faq.answer}
                      </Typography>
                      {index < service.faqs.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            <Typography variant="h5" gutterBottom>
              Top {service.title} Providers in Tirupattur
            </Typography>

            {providers.map((provider) => (
              <Card key={provider.id} sx={{ mb: 3 }}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      image={provider.image}
                      alt={provider.name}
                      sx={{ height: '100%', minHeight: 200 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar src={provider.avatar} sx={{ width: 40, height: 40, mr: 1 }} />
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                          {provider.name}
                        </Typography>
                        {provider.verified && <VerifiedIcon color="primary" fontSize="small" />}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={provider.rating} readOnly precision={0.1} size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          ({provider.reviews} reviews)
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip 
                          icon={<LocationOnIcon fontSize="small" />}
                          label={provider.location} 
                          size="small" 
                        />
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Specializes in: {provider.specializations.join(', ')}
                      </Typography>
                      
                      <Button 
                        variant="contained" 
                        color="primary"
                        component={Link}
                        to={`/providers/${provider.id}`}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Need {service.title} Services?
              </Typography>
              <Typography paragraph>
                Post your event requirement and let service providers contact you with their best offers.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                component={Link}
                to="/create-event"
                sx={{ mb: 2 }}
              >
                Post Your Requirement
              </Button>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Popular Event Types
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List disablePadding>
                <ListItem disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary="Weddings" 
                    secondary="Traditional & contemporary wedding photography"
                  />
                </ListItem>
                <ListItem disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary="Corporate Events" 
                    secondary="Professional coverage for meetings and conferences"
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText 
                    primary="Family Portraits" 
                    secondary="Studio or outdoor portrait sessions"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default ServiceDetail;
