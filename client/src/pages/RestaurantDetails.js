// src/pages/RestaurantDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { LocationOn, LocalDining } from '@mui/icons-material';
import { green, yellow, red } from '@mui/material/colors';
import './RestaurantDetails.css';

const getRatingColor = (rating) => {
  if (rating >= 4) return green[500];
  if (rating >= 3) return yellow[500];
  return red[500];
};

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurant/${id}`)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  const {
    imageUrl,
    name,
    cuisines,
    address,
    locality,
    city,
    aggregateRating,
    averageCostForTwo,
    currency,
    hasTableBooking
  } = restaurant;

  // Remove double quotes from cuisines string
  const formattedCuisines = cuisines.replace(/"/g, '');

  return (
    <div className="restaurant-details-page">
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={name}
        />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Chip
              label={`${aggregateRating}`}
              sx={{ bgcolor: getRatingColor(aggregateRating), color: '#fff' }}
            />
          </div>
          <Typography variant="body1" color="text.secondary">
            <LocalDining sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            {formattedCuisines}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <LocationOn sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            {address}, {locality}, {city}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.primary">
              Average Cost for Two: {currency} {averageCostForTwo}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Rating: {aggregateRating}
            </Typography>
            {hasTableBooking && (
              <Typography variant="body1" color="success.main">
                Table Booking Available
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetails;
