import React, { createContext, useContext, useState } from 'react';

// Create the context
const PlantContext = createContext();

// Create the provider componentz
export const PlantProvider = ({ children }) => {
  // State to manage plant data
  const [plants, setPlants] = useState([
    { id: 1, name: 'Aloe Vera', needsWatering: true },
    { id: 2, name: 'Cactus', needsWatering: false },
    { id: 3, name: 'Snake Plant', needsWatering: true },
  ]);

  return (
    <PlantContext.Provider value={{ plants, setPlants }}>
      {children}
    </PlantContext.Provider>
  );
};

// Custom hook to use the context
export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlantContext must be used within a PlantProvider');
  }
  return context;
};
