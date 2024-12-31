import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Default theme is light
  const [query, setQuery] = useState(''); // Search query state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const [loading, setLoading] = useState(false); // Loading state
  const [showResults, setShowResults] = useState(false); // State to control visibility of search results

  useEffect(() => {
    document.body.setAttribute('data-theme', theme); // Set initial theme on load
  }, [theme]);

  useEffect(() => {
    // Close search results when query is empty
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false); // Hide results
    }
  }, [query]);

  useEffect(() => {
    // Close search results when clicking outside the search bar
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-search')) {
        setShowResults(false); // Close results if click is outside
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme); // Apply theme globally
  };

  // Function to handle the search
  const handleSearch = async (e) => {
    setQuery(e.target.value); // Set the query state
    if (!e.target.value.trim()) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }
    setLoading(true); // Set loading state while fetching
    setShowResults(true); // Show results when the user starts typing
    try {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=sk-m6Sa6772a297c66c67920&q=${encodeURIComponent(e.target.value)}`
      );
      const json = await response.json();
      if (json && json.data) {
        setSearchResults(json.data); // Set search results
      }
    } catch (err) {
      console.error('API error:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🌱 PlantCare
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for plants..."
            value={query}
            onChange={handleSearch}
          />
          {loading && <span className="loading-indicator">Loading...</span>}
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((plant) => (
                  <li key={plant.id}>
                    {/* Display plant name as simple text */}
                    <span>{plant.common_name || plant.scientific_name || 'Unknown Name'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/my-plants" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-leaf"></i> My Plants
            </Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-leaf"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-cog"></i> Profile
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-minus"></i> Logout
            </Link>
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
