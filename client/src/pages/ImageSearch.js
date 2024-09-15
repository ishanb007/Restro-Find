// src/pages/ImageSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './ImageSearch.css'; // Reuse the same styles for cards

const ImageSearch = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cuisineType, setCuisineType] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 12;

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Fetch restaurants based on identified cuisine
  const fetchRestaurants = (cuisine) => {
    axios.get('http://localhost:8080/api/restaurants/cuisine', {
      params: {
        cuisine,
        page: currentPage,
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

  // Handle image search (upload to Gemini API and get cuisine type)
  const handleImageSearch = async () => {
    if (!selectedImage) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    // Assume we have an endpoint to upload image and get the cuisine from the Gemini API
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:8080/api/restaurants/cuisine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { cuisine } = response.data; // Assuming the response contains the cuisine type
      setCuisineType(cuisine);
      fetchRestaurants(cuisine);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setLoading(false);
    }
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    // If cuisineType is set, fetch restaurants when page changes
    if (cuisineType) {
      fetchRestaurants(cuisineType);
    }
  }, [currentPage]);

  return (
    <div className="wrapper">
      <h1>Image-Based Restaurant Search</h1>

      {/* Image Upload Section */}
      <div className="image-upload">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleImageSearch}>Search by Image</button>
      </div>

      {/* Show loading spinner or message while fetching data */}
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* If cuisine type is set, show restaurants */}
          {cuisineType && (
            <div>
              <h2>Results for Cuisine: {cuisineType}</h2>
              <div className="restaurant-cards">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
                  ))
                ) : (
                  <p>No restaurants found for this cuisine.</p>
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageSearch;
