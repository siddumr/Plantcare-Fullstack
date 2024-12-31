import React from 'react';
import { Link } from 'react-router-dom';

const NavigationButtons = () => (
  <section className="navigation-buttons">
    <Link to="/dashboard" className="nav-button">Go to Dashboard</Link>
    <Link to="/settings" className="nav-button">Settings</Link>
  </section>
);

export default NavigationButtons;
