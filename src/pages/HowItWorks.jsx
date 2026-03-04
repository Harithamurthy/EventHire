import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <EventIcon sx={{ fontSize: 48, color: '#1976d2' }} />, 
    title: 'For Event Organizers',
    description: 'Post your event with all details and requirements. Receive applications from talented service providers in Tirupattur. Review applicants, chat with them, and select the best fit for your event.'
  },
  {
    icon: <AssignmentIndIcon sx={{ fontSize: 48, color: '#388e3c' }} />,
    title: 'For Service Providers',
    description: 'Browse available events and apply for those that match your skills. Showcase your profile and experience, and connect directly with organizers through in-app chat.'
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 48, color: '#fbc02d' }} />,
    title: 'Community & Trust',
    description: 'Join a trusted community of verified event professionals and clients. Build your reputation through ratings, reviews, and successful collaborations.'
  },
  {
    icon: <ContactMailIcon sx={{ fontSize: 48, color: '#e64a19' }} />,
    title: 'Easy Communication',
    description: 'Use our secure in-app chat to ask questions, negotiate terms, and finalize event details. Stay updated with real-time notifications.'
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#9c27b0' }} />,
    title: 'Achieve Event Success',
    description: 'Whether you are planning a wedding, birthday, festival, or corporate event, EventHire Tirupattur helps you make it a success by connecting you with the right people.'
  },
];

const HowItWorks = () => (
  <Box
    sx={{
      minHeight: '100vh',
      py: 8,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(120deg, #e3f2fd 0%, #fffde7 60%, #ffe0f7 100%)',
    }}
  >
    {/* Decorative animated blobs */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{ scale: 1.1, opacity: 0.7 }}
      transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        position: 'absolute',
        top: -80,
        left: -80,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle at 30% 30%, #90caf9 60%, #fff0 100%)',
        borderRadius: '50%',
        zIndex: 0,
        filter: 'blur(8px)',
      }}
    />
    <motion.div
      initial={{ scale: 1, opacity: 0.4 }}
      animate={{ scale: 1.2, opacity: 0.6 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        position: 'absolute',
        bottom: -110,
        right: -110,
        width: 340,
        height: 340,
        background: 'radial-gradient(circle at 60% 60%, #f8bbd0 60%, #fff0 100%)',
        borderRadius: '50%',
        zIndex: 0,
        filter: 'blur(10px)',
      }}
    />
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 700, color: '#1976d2', letterSpacing: 1 }}>
          How EventHire Tirupattur Works
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 6, color: '#6d4c41', fontWeight: 500 }}>
          Making local events easy and successful for everyone
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {steps.map((step, idx) => (
          <Grid item xs={12} sm={6} md={4} key={step.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Paper elevation={6} sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 6,
                minHeight: 280,
                background: `linear-gradient(135deg, #fff 80%, ${idx % 2 === 0 ? '#e3f2fd' : '#f8bbd0'} 100%)`,
                boxShadow: `0 8px 32px ${idx % 2 === 0 ? 'rgba(25, 118, 210, 0.10)' : 'rgba(233, 30, 99, 0.11)'}`
              }}>
                <motion.div
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', delay: idx * 0.2 }}
                  style={{ display: 'inline-block' }}
                >
                  {step.icon}
                </motion.div>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: idx % 2 === 0 ? '#1976d2' : '#d81b60' }}>
                  {step.title}
                </Typography>
                <Divider sx={{ my: 2, bgcolor: idx % 2 === 0 ? '#1976d2' : '#d81b60', opacity: 0.18 }} />
                <Typography variant="body1" sx={{ color: '#444', fontWeight: 400 }}>
                  {step.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 500, fontSize: 18 }}>
          Still have questions? <b>Contact us</b> or explore our services to get started!
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default HowItWorks;
