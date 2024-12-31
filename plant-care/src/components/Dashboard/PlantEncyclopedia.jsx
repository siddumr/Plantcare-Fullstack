import React, { useState } from 'react';
import './PlantEncyclopedia.css';

const PlantEncyclopedia = () => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch plant data using Perenual API
  const fetchPlantData = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=sk-m6Sa6772a297c66c67920&q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from Perenual API.');
      }

      const json = await response.json();
      console.log('API Response:', json);

      if (json && json.data && json.data.length > 0) {
        setPlants(json.data);
      } else {
        setError('No plant data found.');
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to fetch plant data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plant-encyclopedia">
      <h2>Global Plant Encyclopedia</h2>
      <div className="plant-encyclopedia-search-container">
        <input
          className="plant-encyclopedia-input"
          type="text"
          placeholder="Search for a plant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="plant-encyclopedia-button"
          onClick={fetchPlantData}
          disabled={!query.trim() || loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p className="plant-encyclopedia-error-message">{error}</p>}
      <div className="plant-encyclopedia-results">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div className="plant-encyclopedia-card" key={plant.id}>
              <h3>{plant.common_name || plant.scientific_name || 'Unknown Name'}</h3>
              <p><strong>Scientific Name:</strong> {plant.scientific_name || 'N/A'}</p>
              {plant.default_image && plant.default_image.medium ? (
                <img
                  src={plant.default_image.medium}
                  alt={plant.common_name || plant.scientific_name || 'Plant'}
                  className="plant-encyclopedia-image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))
        ) : (
          !loading && <p>No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlantEncyclopedia;
