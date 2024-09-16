import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard'; 
import './FilterSearch.css';

// Country mapping with integer codes
const countryMapping = {
  'India': 1,
  'Australia': 14,
  'Brazil': 30,
  'Canada': 37,
  'Indonesia': 94,
  'New Zealand': 148,
  'Phillipines': 162,
  'Qatar': 166,
  'Singapore': 184,
  'South Africa': 189,
  'Sri Lanka': 191,
  'Turkey': 208,
  'UAE': 214,
  'United Kingdom': 215,
  'United States': 216,

};

const cuisineOptions = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'North Indian', 'Mithai', 'Street Food', 'South Indian', 'Continental', 'Fast Food', 'Desserts', 'Asian', 'Thai', 'Rajasthani', 'Sea Food'];

const FilterSearch = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [averageCostForTwo, setAverageCostForTwo] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchConducted, setSearchConducted] = useState(false);
  const pageSize = 12;

  const fetchRestaurants = (page = currentPage) => {
    const countryCode = country ? countryMapping[country] : null;

    setLoading(true);

    // Make API request with parameters
    axios.get('http://localhost:8080/api/restaurants/filter', {
      params: {
        name: name || null,
        countryId: countryCode || null, // Send country code as an integer
        cuisine: cuisine || null,
        averageCostForTwo: averageCostForTwo || null,
        page: page-1,
        size: pageSize,
      }
    })
    .then(response => {
      const { content, totalPages } = response.data;
      setRestaurants(content || []);
      setTotalPages(totalPages || 1);
      setSearchConducted(true); 
    })
    .catch(error => {
      console.error('Error fetching filtered restaurant data:', error);
    })
    .finally(() => {
      setLoading(false); 
    });
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    fetchRestaurants(1); // Fetch data for the first page
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchRestaurants(newPage); // Fetch restaurants for the new page
    }
  };

  return (
    <div className="wrapper">
      <h1>Filter Search</h1>
      <div className="search-fields">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          {Object.keys(countryMapping).map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Select Cuisine</option>
          {cuisineOptions.map((cuisineOption) => (
            <option key={cuisineOption} value={cuisineOption}>
              {cuisineOption}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Avg Cost for Two"
          value={averageCostForTwo}
          onChange={(e) => setAverageCostForTwo(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchConducted && restaurants.length === 0 && (
            <p>No restaurants found for the search criteria.</p>
          )}

          {restaurants.length > 0 && (
            <>
              <div className="restaurant-cards">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
                ))}
              </div>
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

          {!searchConducted && (
            <p>Please enter search criteria to find restaurants.</p>
          )}
        </>
      )}
    </div>
  );
};

export default FilterSearch;
