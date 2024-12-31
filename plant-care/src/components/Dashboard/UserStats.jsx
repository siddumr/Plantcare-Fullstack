import React, { useEffect, useState } from 'react';
import { FaTint, FaSeedling, FaSmile, FaEye, FaClock, FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './UserStat.css';

const UserStats = ({ plants }) => {
  const [dailyTip, setDailyTip] = useState('');
  const [filter, setFilter] = useState('all');

  // Calculate statistics
  const totalPlants = plants.length;

  const plantsToWater = plants.filter((plant) => {
    if (plant.lastWateredDate && plant.wateringFrequency) {
      const lastWatered = new Date(plant.lastWateredDate);
      const nextWatering = new Date(lastWatered);
      nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequency);
      return nextWatering <= new Date();
    }
    return false;
  });

  const healthyPlants = plants.filter((plant) => plant.healthStatus === 'healthy').length;

  // Filter plants based on health status
  const filteredPlants = plants.filter((plant) => {
    if (filter === 'all') return true;
    return plant.healthStatus === filter;
  });

  useEffect(() => {
    if (plantsToWater.length > 0) {
      toast.info(`${plantsToWater.length} plants need watering! 🌱`, { autoClose: 3000 });
    } else {
      toast.success(`All plants are happy and hydrated! 🌟`, { autoClose: 3000 });
    }

    const tips = [
      'Water your plants regularly but don’t overdo it.',
      'Make sure your plants get enough sunlight.',
      'Repot your plants when they outgrow their pots.',
    ];
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [plantsToWater]);

  return (
    <section className="user-stats">
      <h2>Your Plant Stats</h2>

      {/* Filter Options */}
      <div className="filter-options">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All Plants
        </button>
        <button onClick={() => setFilter('healthy')} className={filter === 'healthy' ? 'active' : ''}>
          Healthy Plants
        </button>
        <button onClick={() => setFilter('needs_attention')} className={filter === 'needs_attention' ? 'active' : ''}>
          Needs Care
        </button>
        <button onClick={() => setFilter('wilting')} className={filter === 'wilting' ? 'active' : ''}>
          Dying Plants
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaSeedling className="stat-icon" />
          <h3>{totalPlants}</h3>
          <p>Total Plants</p>
        </div>
        <div className="stat-card">
          <FaTint className="stat-icon" />
          <h3>{plantsToWater.length}</h3>
          <p>Need Watering</p>
        </div>
        <div className="stat-card">
          <FaSmile className="stat-icon" />
          <h3>{healthyPlants}</h3>
          <p>Healthy Plants</p>
        </div>
      </div>

      <div className="watering-progress">
        <h4>Watering Progress</h4>
        {filteredPlants.map((plant) => {
          if (plant.lastWateredDate && plant.wateringFrequency) {
            const lastWatered = new Date(plant.lastWateredDate);
            const nextWatering = new Date(lastWatered);
            nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequency);
            const daysUntilWatering = Math.max(
              0,
              (nextWatering.getTime() - Date.now()) / (24 * 60 * 60 * 1000)
            ).toFixed(0);
            const progressPercentage = Math.min(
              100,
              ((plant.wateringFrequency - daysUntilWatering) / plant.wateringFrequency) * 100
            );
            let progressClass = 'normal';
        
            if (daysUntilWatering <= 2) {
              progressClass = 'urgent';
            } else if (daysUntilWatering <= plant.wateringFrequency) {
              progressClass = 'normal';
            } else {
              progressClass = 'watered';
            }
        
            return (
              <div key={plant._id} className="plant-progress-bar">
                <p>
                  {plant.name}: {daysUntilWatering === "0" ? "Need Water" : `Water in ${daysUntilWatering} days`}
                </p>
                <div className="progress-bar-container">
                  <div
                    className={`progress-bar ${progressClass}`}
                    style={{ width: `${progressPercentage}%` }}
                    data-label={`${progressPercentage.toFixed(0)}%`}
                  ></div>
                </div>
              </div>
            );
          }
          return null;
        })}
        
        
      </div>

      <div className="daily-tip">
        <h4>Tip of the Day</h4>
        <p>{dailyTip}</p>
      </div>

      {/* Watering History Section */}
      <div className="watering-history">
        <h4>Watering History</h4>
        {filteredPlants.map((plant) => (
          <div key={plant._id} className="watering-record">
            <p>{plant.name}: Last watered on {new Date(plant.lastWateredDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <Link to="/my-plants" className="view-plants-btn">
        <FaEye className="btn-icon" /> View My Plants
      </Link>
    </section>
  );
};

export default UserStats;

