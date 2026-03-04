import { Grid, Card, CardMedia, CardContent, CardActions, Box, Typography, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

const FeaturedEventCard = (props) => {
  // Handle both individual props and event object
  const { delay } = props;
  
  // If an event object is passed, extract properties from it
  const event = props.event || {};
  
  // Use either direct props or properties from the event object
  const id = props.id || event.id;
  const image = props.image || event.image;
  const title = props.title || event.title;
  const location = props.location || event.location;
  const date = props.date || event.date;
  const category = props.category || event.category;
  return (
    <Grid item xs={12} sm={6} md={3}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        <Card 
          sx={{ 
            height: '100%',
            maxWidth: 220,
            minWidth: 180,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.03)',
            },
            p: 1
          }}
        >
          <CardMedia
            component="img"
            height="80"
            image={image}
            alt={title}
            sx={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '70%',
              maxWidth: '70%',
              margin: '0 auto',
              borderRadius: 2
            }}
          />
          <CardContent sx={{ flexGrow: 1, p: 1 }}>
            <Chip 
              label={category} 
              size="small" 
              sx={{ mb: 0.5, bgcolor: '#f3e5f5', color: '#9c27b0', fontSize: '0.7rem' }} 
            />
            <Typography gutterBottom variant="subtitle2" component="h2" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                {location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EventIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                {date}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ p: 1 }}>
            <Button 
              size="small" 
              sx={{ color: '#9c27b0', fontSize: '0.85rem', px: 1 }}
              component={Link}
              to={`/events/${id || (title && title.toLowerCase().replace(/\s+/g, '-'))}`}
            >
              View
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default FeaturedEventCard;
