// src/components/RestaurantCard.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip } from '@mui/material';
import { LocationOn, LocalDining } from '@mui/icons-material';
import { green, yellow, red } from '@mui/material/colors';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const getRatingColor = (rating) => {
  if (rating >= 4) return green[500];
  if (rating >= 3) return yellow[500];
  return red[500];
};

const RestaurantCard = ({ restaurant }) => {
  const {
    imageUrl,
    name,
    cuisines,
    locality,
    city,
    averageCostForTwo,
    currency,
    aggregateRating
  } = restaurant;

  // Remove double quotes from cuisines string
  const formattedCuisines = cuisines.replace(/"/g, '');

  return (
    <Card className="restaurant-card">
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Chip
            label={`${aggregateRating}`}
            sx={{ bgcolor: getRatingColor(aggregateRating), color: '#fff' }}
          />
        </div>
        <div className="restaurant-details">
          <div className="restaurant-info">
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {locality}, {city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <LocalDining sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {formattedCuisines}
            </Typography>
          </div>
          <div className="restaurant-pricing">
            <Typography variant="body2" color="text.secondary">
              Price for two: {currency} {averageCostForTwo}
            </Typography>
          </div>
        </div>
        <Link to={`/restaurants/${restaurant.restaurantId}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ bgcolor: '#d32f2f', color: '#ffffff', mt: 2 }}>
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
