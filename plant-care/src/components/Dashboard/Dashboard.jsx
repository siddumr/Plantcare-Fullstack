import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/NavBar';
import UserStats from './UserStats';
import UpcomingTasks from './UpcomingTasks';
import PlantEncyclopedia from './PlantEncyclopedia';
import Footer from '../Footer/Footer';
import axios from 'axios'; // Axios for API calls
import './Dashboard.css';

const DashboardPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch plant data from backend
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <NavBar />
      {!loading ? (
        <>
          <UserStats plants={plants} />

         
        </>
      ) : (
        <p>Loading dashboard...</p>
      )}
      <Footer />
    </div>
  );
};

export default DashboardPage;
