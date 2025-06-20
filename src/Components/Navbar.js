import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const getActiveStyle = ({ isActive }) =>
    isActive ? { color: '#e63946', fontWeight: 'bold' } : {};

  return (
    <nav className="navbar">
      <h1>CrossFit BeastMode</h1>
      <ul>
        <li><NavLink to="/" style={getActiveStyle}>Home</NavLink></li>
        <li><NavLink to="/about" style={getActiveStyle}>About</NavLink></li>
        <li><NavLink to="/classes" style={getActiveStyle}>Classes</NavLink></li>
        <li><NavLink to="/wod" style={getActiveStyle}>WOD</NavLink></li>

        <li><NavLink to="/contact" style={getActiveStyle}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
