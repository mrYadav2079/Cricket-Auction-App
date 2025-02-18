import React from 'react';
import { Card, CardMedia, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion'; // For animations
import SportsCricketIcon from '@mui/icons-material/SportsCricket'; // Decorative icon

// Styled Components for custom styling
const StyledCard = styled(Card)(({ theme }) => ({
  width: 384, // Retain original card width
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'white',
  color: '#1E1E1E',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 12px 35px rgba(0, 0, 0, 0.3)',
  },
}));

const CardHeader = styled(Box)({
  position: 'relative',
  height: '400px', // Fixed header height
  width: '100%', // Ensure header takes full width of the card
  overflow: 'hidden', // Hide any overflow from the image
});

const StyledCardMedia = styled(CardMedia)({
  height: '100%', // Make the image fill the header height
  width: '100%', // Make the image fill the header width
  objectFit: 'cover', // Ensure the image covers the entire header without distortion
  objectPosition: 'center', // Center the image within the header
});

const CardBody = styled(Box)({
  textAlign: 'center',
  padding: '16px', // Reduced padding
  backgroundColor: 'white',
});

const CardFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '8px', // Reduced padding
  backgroundColor: 'white',
  marginBottom: '24px', // Increased margin-bottom
});

const Stats = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5', // Light gray background for stats boxes
  padding: '12px', // Reduced padding
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  minWidth: '90px', // Reduced size of stats boxes
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
  },
});

const StatLabel = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '12px', // Reduced font size
  color: '#666',
  textTransform: 'uppercase',
});

const StatValue = styled(Typography)(({ color }) => ({
  fontSize: '16px', // Reduced font size
  fontWeight: 'bold',
  color: color || '#1E1E1E',
  marginTop: '4px', // Reduced margin
}));

const PlayerName = styled(Typography)({
  fontSize: '24px', // Slightly reduced font size
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #FF9800, #FFC107)', // Gradient for name
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '4px', // Reduced margin
});

const BasePrice = styled(Typography)({
  fontSize: '16px', // Reduced font size
  fontWeight: '600',
  color: '#666',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

const PlayerCard = ({ player }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard>
        <CardHeader>
          <StyledCardMedia
            component="img"
            image={player.image}
            alt={player.name}
          />
        </CardHeader>
        <CardBody>
          <PlayerName>{player.name}</PlayerName>
          <BasePrice>
            <SportsCricketIcon fontSize="small" />
            Base Price: ₹{player.basePrice}
          </BasePrice>
        </CardBody>
        <CardFooter>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Stats>
                <StatLabel>Matches</StatLabel>
                <StatValue color="#4CAF50">{player.matches}</StatValue>
              </Stats>
            </Grid>
            <Grid item>
              <Stats>
                <StatLabel>Runs</StatLabel>
                <StatValue color="#FF9800">{player.runs}</StatValue>
              </Stats>
            </Grid>
            <Grid item>
              <Stats>
                <StatLabel>Wickets</StatLabel>
                <StatValue color="#E91E63">{player.wickets}</StatValue> {/* Updated color */}
              </Stats>
            </Grid>
          </Grid>
        </CardFooter>
      </StyledCard>
    </motion.div>
  );
};

export default PlayerCard;