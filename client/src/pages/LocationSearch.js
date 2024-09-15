// src/pages/LocationSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './LocationSearch.css'; // Reusing the same styles

const LocationSearch = () => {
  // State to hold user inputs for latitude, longitude, and range
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [range, setRange] = useState('');
  
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchConducted, setSearchConducted] = useState(false); // New state to track if search was conducted
  
  // Hardcoded page size
  const pageSize = 12;

  const fetchData = () => {
    // If latitude, longitude, or range are empty, do not fetch data
    if (!latitude || !longitude || !range) {
      return;
    }

    // Set loading to true while fetching data
    setLoading(true);

    axios.get('http://localhost:8080/api/restaurants/location', {
      params: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        range: parseFloat(range),
        page: currentPage-1,
        size: pageSize,
      }
    })
    .then(response => {
      const { content, totalPages } = response.data;
      setRestaurants(content || []);
      setTotalPages(totalPages || 1);
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch(error => {
      console.error('Error fetching restaurant data:', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Only fetch data if latitude, longitude, and range are valid and search has been conducted
    if (latitude && longitude && range && searchConducted) {
      fetchData();
    }
  }, [currentPage]); // Fetch data when page changes

  const handleSearch = () => {
    // Reset to page 1 when searching with new inputs
    setCurrentPage(1);
    setSearchConducted(true); // Mark that a search was conducted
    fetchData();
  };

  // Define handlePageChange function to handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="wrapper">
      <h1>Search Restaurants by Location</h1>
      <div className="search-fields">
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Range (km)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Show loading spinner or message while fetching data */}
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Initial state: Prompt user to enter values */}
          {!searchConducted && (
            <p>Please enter latitude, longitude, and range to search for restaurants.</p>
          )}

          {/* No restaurants found after search */}
          {searchConducted && !loading && restaurants.length === 0 && (
            <p>No restaurants found. Please adjust your search criteria.</p>
          )}

          <div className="restaurant-cards">
            {restaurants.length > 0 && (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
              ))
            )}
          </div>

          {/* Pagination */}
          {restaurants.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSearch;
