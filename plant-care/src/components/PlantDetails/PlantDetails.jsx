import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './PlantDetails.css';
import Chatbot from './Chatbot';
import { Link } from 'react-router-dom';


const PlantDetailsPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewDetails, setViewDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editDate, setEditDate] = useState(''); // New state for last watered date

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants');
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSort = (e) => setSortOption(e.target.value);
  const handleViewDetails = (plant) => {
    setViewDetails(plant);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleEditLastWatered = (plantId) => {
    // Logic to handle updating the last watered date
    const updatedPlants = plants.map((plant) => {
      if (plant._id === plantId) {
        plant.lastWateredDate = new Date(editDate);
      }
      return plant;
    });
    setPlants(updatedPlants);

    // Send the updated date to the server
    fetch(`http://localhost:5000/api/plants/${plantId}/updateLastWatered`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lastWateredDate: new Date(editDate) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Last Watered Date updated:', data);
      })
      .catch((error) => {
        console.error('Error updating date:', error);
      });
  };

  const filteredPlants = plants
    .filter(
      (plant) =>
        (selectedCategory === 'All' || plant.type === selectedCategory) &&
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOption === 'name'
        ? a.name.localeCompare(b.name)
        : b.progress - a.progress
    );

  const handleDeletePlant = async (plantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/plants/${plantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlants(plants.filter((plant) => plant._id !== plantId));
        alert('Plant deleted successfully.');
      } else {
        const errorData = await response.json();
        console.error('Delete error:', errorData.message);
        alert(`Failed to delete the plant: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete the plant due to a network or server issue.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="plant-details-page-wrapper">
        {/* Sidebar */}
        <aside className="plant-details-sidebar">
          <h3>Categories</h3>
          <ul>
            <li onClick={() => setSelectedCategory('All')}>All Plants</li>
            <li onClick={() => setSelectedCategory('Succulent')}>Succulents</li>
            <li onClick={() => setSelectedCategory('Houseplant')}>Houseplants</li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="plant-details-main-content">
          <h1>My Plants</h1>
          <Chatbot />
          
          {/* Search and Sort */}
          <div className="plant-details-controls">
          <input
          type="text"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={handleSearch}
          className="plant-details-search-bar"
          />
          <select
          value={sortOption}
          onChange={handleSort}
          className="plant-details-sort-dropdown"
          >
          <option value="name">Sort by Name</option>
          <option value="progress">Sort by Progress</option>
          </select>
          <Link to="/add-plant" className="cta-button">New</Link>
          </div>

          {/* Plant Grid */}
          <div className="plant-details-grid">
            {filteredPlants.map((plant) => (
              <div key={plant._id} className="plant-details-card">
                <img
                  src={plant.image ? `http://localhost:5000${plant.image}` : '/placeholder.jpg'}
                  alt={plant.name}
                  className="plant-details-card-image"
                  title={plant.name}
                />
                <div className="plant-details-info">
                  <h2>{plant.name}</h2>
                  <p className="plant-details-description">{plant.description}</p>
                  <p className="plant-details-last-watered">
                    <strong>Last Watered:</strong>{' '}
                    {plant.lastWateredDate
                      ? new Date(plant.lastWateredDate).toLocaleDateString()
                      : 'Not recorded'}

                  </p>
                </div>
                <div className="plant-details-actions">
                  <button
                    className="plant-details-view-details"
                    onClick={() => handleViewDetails(plant)}
                  >
                    View Details
                  </button>
                  <button
                    className="plant-details-delete"
                    onClick={() => handleDeletePlant(plant._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && viewDetails && (
          <div className="plant-details-modal">
            <div className="plant-details-modal-content">
              <h2>{viewDetails.name}</h2>
              <img
                src={viewDetails.image ? `http://localhost:5000${viewDetails.image}` : '/placeholder.jpg'}
                alt={viewDetails.name}
                className="plant-details-modal-image"
              />
              <p>{viewDetails.description}</p>
              <p><strong>Type:</strong> {viewDetails.type}</p>
              <p><strong>Watering Frequency:</strong> {viewDetails.wateringFrequency}</p>
              <p><strong>Light Requirements:</strong> {viewDetails.lightRequirements}</p>
              <p><strong>Health Status:</strong> {viewDetails.healthStatus}</p>
              <p><strong>Planting Date:</strong> {new Date(viewDetails.plantingDate).toLocaleDateString()}</p>
              <p><strong>Last Watered Date:</strong> {viewDetails.lastWateredDate ? new Date(viewDetails.lastWateredDate).toLocaleDateString() : 'Not recorded'}</p>

              {/* Date Picker for Last Watered Date */}
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                placeholder="Update Last Watered Date"
              />
              <br></br>
              <button onClick={() => handleEditLastWatered(viewDetails._id)}>Update Date</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetailsPage;
