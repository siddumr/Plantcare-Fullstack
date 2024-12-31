import React, { useState } from 'react';
import '../HomePage-CSS/PlantCareTips.css';
import { FaLeaf, FaSun, FaWater, FaSeedling, FaThermometerHalf } from 'react-icons/fa';

const PlantCareTips = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const tips = [
    { icon: <FaWater />, text: 'Water your plants regularly but avoid overwatering. Overwatering can lead to root rot.' },
    { icon: <FaSun />, text: 'Ensure plants get the right amount of sunlight for their species. Some thrive in shade!' },
    { icon: <FaLeaf />, text: 'Use the right type of soil for each plant. Check pH levels for better growth.' },
    { icon: <FaSeedling />, text: 'Fertilize plants periodically to replenish nutrients in the soil.' },
    { icon: <FaThermometerHalf />, text: 'Maintain the ideal temperature for your plant type, avoiding extreme conditions.' },
  ];

  return (
    <section className="plant-care-tips">
      <h2>
        <span className="title-highlight">Plant Care Tips</span>
      </h2>
      <ul>
        {tips.map((tip, index) => (
          <li
            key={index}
            className={`tip-item ${expandedTip === index ? 'expanded' : ''}`}
            onClick={() => toggleTip(index)}
          >
            <div className="tip-icon">{tip.icon}</div>
            <div className="tip-text">{tip.text}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlantCareTips;
