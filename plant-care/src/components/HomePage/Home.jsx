import React from 'react';
import { usePlantContext } from './PlantContext';
import '../HomePage-CSS/Home.css';
import CallToActionButtons from './CallToActionButtons';
import PlantCareTips from './PlantCareTips';
import UserStats from '../Dashboard/UserStats';
import PlantOverview from './PlantOverview';
import NavigationButtons from './NavigationButtons';
import WeatherWidget from './WeatherWidget';
import UpcomingTasks from '../Dashboard/UpcomingTasks';
import FeaturedPlant from './FeaturedPlant';
import SeasonalCalendar from './SeasonalCalendar';
import '../HomePage-CSS/FeaturedPlant.css';
import '../HomePage-CSS/Weather.css';

import '../HomePage-CSS/PlantOverview.css';

import '../HomePage-CSS/PlantCareTips.css';
import Footer from '../Footer/Footer';
import PlantQuiz from './PlantQuiz';
import NavBar from '../Navbar/NavBar';
import Chatbot from '../PlantDetails/Chatbot';

const Home = () => {
  const { plants } = usePlantContext();

  return (
    <div className="home-page">
    <NavBar/>
      <header className="home-header">
        <div className="header-content">
          <h1>
            Welcome to the <span className="highlight">Plant Care Reminder</span> App
          </h1>
          <p>Your personal assistant to keep your plants healthy and happy!</p>
          <CallToActionButtons />
        </div>
      </header>

      <PlantCareTips />
      {/* Flex container for Weather and Calendar */}
      <div className="weather-calendar-container">
        <WeatherWidget />
        <SeasonalCalendar />
      </div>
     
      <PlantQuiz/>
      <Footer/>
    </div>
  );
};

export default Home;
