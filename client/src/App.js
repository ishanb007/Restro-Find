import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LocationSearch from './pages/LocationSearch';
import FilterSearch from './pages/FilterSearch';
import ImageSearch from './pages/ImageSearch';
import RestaurantsList from './pages/RestaurantsList';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants-list" element={<RestaurantsList />} />
          <Route path="/location-search" element={<LocationSearch />} />
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/image-search" element={<ImageSearch />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
