import React from 'react';

const FeaturedPlant = ({ plants }) => {
  const featuredPlant = plants[0]; // Example logic to pick the first plant

  return (
    <section className="featured-plant">
      <h2>Featured Plant of the Day</h2>
      <div className="plant-card">
        <h3>{featuredPlant.name}</h3>
        <p>{featuredPlant.needsWatering ? 'Needs watering today!' : 'All good today!'}</p>
      </div>
    </section>
  );
};

export default FeaturedPlant;
