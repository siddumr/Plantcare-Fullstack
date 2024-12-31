import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlantProvider } from './components/HomePage/PlantContext';
import Home from './components/HomePage/Home';
import NavBar from './components/Navbar/NavBar';
import AddPlantPage from './components/AddPlant/AddPlantPage';
import LoginForm from './components/Login/Login';
import PlantDetailsPage from './components/PlantDetails/PlantDetails';
import DashboardPage from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './components/Profile/Profile';

function App() {
  return (
    <PlantProvider>
      <Router>
         {/* Assuming you want to show the NavBar on every page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/my-plants" element={<PlantDetailsPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<DashboardPage />} />}  // Pass element as a prop
          />
          <Route path="/add-plant" element={<AddPlantPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </PlantProvider>
  );
}

export default App;
