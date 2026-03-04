import { Grid, Card, Box, Typography, Button, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useState } from 'react';

const ServiceCard = ({ icon, title, description, delay, withIconAnimation }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <Card 
          elevation={2} 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
            }
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 120,
              position: 'relative',
            }}
          >
            {withIconAnimation ? (
              <motion.div
                whileTap={{ scale: 1.15, boxShadow: '0 0 0 16px rgba(25, 118, 210, 0.15)' }}
                whileHover={{
                  filter: 'drop-shadow(0 0 10px #1976d2aa)',
                  scale: 1.08
                }}
                style={{ display: 'inline-flex', borderRadius: '50%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 16 }}
              >
                {icon}
                {/* Pulse ripple effect */}
                <motion.span
                  initial={false}
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.7, 0.2, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'easeInOut',
                    delay: 0.2
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(25, 118, 210, 0.10)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
              </motion.div>
            ) : (
              icon
            )}
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {title}
            </Typography>
            <Typography align="center" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button 
              size="small" 
              component={Link} 
              to={`/services/${title.toLowerCase().replace(' ', '-')}`}
              sx={{ color: '#1976d2' }}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default ServiceCard;
