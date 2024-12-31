import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionButtons = () => (
  <section className="cta-buttons">
    <Link to="/add-plant" className="cta-button">Add a Plant</Link>
    <Link to="/my-plants" className="cta-button">View My Plants</Link>
  </section>
);

export default CallToActionButtons;
