import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <RestaurantIcon style={{ marginRight: '8px' }} /> {/* Icon next to text */}
          Restro Find
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/restaurants-list">Restaurants List</Link></li> 
        <li><Link to="/location-search">Location Search</Link></li>
        <li><Link to="/filter-search">Filter Search</Link></li>
        <li><Link to="/image-search">Image Search</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
