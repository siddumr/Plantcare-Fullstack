import React from 'react';

const PlantOverview = ({ plants }) => (
  <section className="plant-overview">
    <h2>Plants Needing Attention Today</h2>
    <div className="plant-cards">
      {plants.filter(plant => plant.needsWatering).map(plant => (
        <div key={plant.id} className="plant-card">
          <h3>{plant.name}</h3>
          <p>Needs watering: Yes</p>
        </div>
      ))}
    </div>
  </section>
);

export default PlantOverview;
