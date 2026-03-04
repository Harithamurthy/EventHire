import { useState, useEffect } from 'react';
import { 
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Card,
  Pagination,
  Button,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { motion } from 'framer-motion';
import FeaturedEventCard from '../components/FeaturedEventCard';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const eventsPerPage = 9;

  // Mock data for events - in real app, you'd fetch this from an API
  const mockEvents = [
    {
      id: 1,
      title: 'Wedding Photography Needed',
      location: 'Jolarpet, Tirupattur',
      date: 'May 15, 2025',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80', // Wedding photography, bride/groom
    },
    {
      id: 2,
      title: 'Birthday Party Catering',
      location: 'Vaniyambadi, Tirupattur',
      date: 'May 20, 2025',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', // Catering, buffet
    },
    {
      id: 3,
      title: 'College Fest DJ Required',
      location: 'Tirupattur Town',
      date: 'June 5, 2025',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80', // DJ/music
    },
    {
      id: 4,
      title: 'Corporate Event Planner',
      location: 'Ambur, Tirupattur',
      date: 'June 15, 2025',
      category: 'Planning',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=500&q=80', // Corporate event
    },
    {
      id: 5,
      title: 'Traditional Dance Performance',
      location: 'Natrampalli, Tirupattur',
      date: 'May 25, 2025',
      category: 'Performance',
      image: 'https://images.unsplash.com/photo-1504647164485-1d91e1d0a112?auto=format&fit=crop&w=500&q=80', // Dance
    },
    {
      id: 6,
      title: 'Wedding Decoration Services',
      location: 'Alangayam, Tirupattur',
      date: 'July 10, 2025',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80', // Wedding decoration
    },
    {
      id: 7,
      title: 'Anniversary Party Host',
      location: 'Tirupattur Central',
      date: 'June 22, 2025',
      category: 'Planning',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=500&q=80', // Anniversary/celebration
    },
    {
      id: 8,
      title: 'Sangeet Night Music Band',
      location: 'Vaniyambadi, Tirupattur',
      date: 'July 2, 2025',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80', // Band/music
    },
    {
      id: 9,
      title: 'Corporate Seminar Catering',
      location: 'Ambur, Tirupattur',
      date: 'July 8, 2025',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=80', // Seminar/catering
    },
    {
      id: 10,
      title: 'Kids Birthday Clown Show',
      location: 'Natrampalli, Tirupattur',
      date: 'July 12, 2025',
      category: 'Performance',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80', // Clown/kids
    },
    {
      id: 11,
      title: 'Engagement Party Decor',
      location: 'Alangayam, Tirupattur',
      date: 'July 18, 2025',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 12,
      title: 'Fashion Show Photography',
      location: 'Tirupattur Town',
      date: 'July 26, 2025',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' || event.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  // Pagination
  const pageCount = Math.ceil(sortedEvents.length / eventsPerPage);
  const currentEvents = sortedEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Categories for filter dropdown
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Videography', label: 'Videography' },
    { value: 'Catering', label: 'Catering' },
    { value: 'Music', label: 'Music & DJ' },
    { value: 'Planning', label: 'Event Planning' },
    { value: 'Decoration', label: 'Decoration' },
    { value: 'Performance', label: 'Performance' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #9c27b0 0%, #ce93d8 100%)',
          color: 'white',
          py: 6,
          mb: 4
        }}
      >
        <Container>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Find Events in Tirupattur
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, maxWidth: 600 }}>
            Browse opportunities to showcase your talents and services at local events
          </Typography>
          
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              mt: 2,
              maxWidth: 800,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for events, services, or locations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                sx: { bgcolor: 'white', borderRadius: 1 }
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 4,
            gap: 2,
          }}
        >
          <Chip 
            icon={<FilterListIcon />} 
            label={`${filteredEvents.length} ${filteredEvents.length === 1 ? 'Event' : 'Events'}`}
            sx={{ bgcolor: '#f3e5f5', color: '#9c27b0', fontWeight: 'bold' }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
                  Category
                </Box>
              </InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Filter by Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SortIcon fontSize="small" sx={{ mr: 1 }} />
                  Sort By
                </Box>
              </InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography>Loading events...</Typography>
          </Box>
        ) : currentEvents.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No events found matching your criteria
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search terms or filters
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setSortBy('newest');
              }}
            >
              Clear All Filters
            </Button>
          </Card>
        ) : (
          <>
            <Grid container spacing={4}>
              {currentEvents.map((event, index) => (
                <FeaturedEventCard
                  key={event.id}
                  id={event.id}
                  image={event.image}
                  title={event.title}
                  location={event.location}
                  date={event.date}
                  category={event.category}
                  delay={index * 0.1}
                />
              ))}
            </Grid>
            
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="secondary" 
                  size="large" 
                />
              </Box>
            )}
            
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Can't find what you're looking for?
              </Typography>
              <Button 
                component={Link} 
                to="/post-event" 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.2, 
                  bgcolor: '#9c27b0',
                  '&:hover': {
                    bgcolor: '#7b1fa2'
                  }
                }}
              >
                Post Your Event Need
              </Button>
            </Box>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default EventList;
