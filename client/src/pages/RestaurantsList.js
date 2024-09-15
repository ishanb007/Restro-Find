// src/pages/RestaurantsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantsList.css';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const pageSize = 12;

  useEffect(() => {
    // Scroll to the top of the page whenever the current page changes
    window.scrollTo(0, 0);

    // Set loading to true before fetching data
    setLoading(true);

    axios.get('http://localhost:8080/api/restaurants', {
      params: {
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
      setLoading(false); // Set loading to false even if there is an error
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="wrapper">
      <h1>Restaurants List</h1>

      {/* Show loading spinner or message while fetching data */}
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
          {/* You can also add a spinner here if you want */}
        </div>
      ) : (
        <>
          <div className="restaurant-cards">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
              ))
            ) : (
              <p>No restaurants found.</p>
            )}
          </div>
          
          {/* Pagination */}
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
        </>
      )}
    </div>
  );
};

export default RestaurantsList;
