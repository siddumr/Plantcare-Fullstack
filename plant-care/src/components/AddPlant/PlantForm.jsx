import React, { useState } from "react";
import './PlantForm.css';

const PlantForm = ({ data, onChange }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
    validateField(name, value); // Validate field on change
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "This field is required.";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  return (
    <div className="plant-form-container">
      <label className="plant-form-label">
        Plant Name:
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          onBlur={(e) => validateField(e.target.name, e.target.value)} 
          className={`plant-form-input ${errors.name ? 'plant-input-error' : ''}`}
        />
        {errors.name && <div className="plant-error-message">{errors.name}</div>}
      </label>

      <label className="plant-form-label">
        Plant Type:
        <input
          type="text"
          name="type"
          value={data.type}
          onChange={handleChange}
          onBlur={(e) => validateField(e.target.name, e.target.value)} 
          className={`plant-form-input ${errors.type ? 'plant-input-error' : ''}`}
        />
        {errors.type && <div className="plant-error-message">{errors.type}</div>}
      </label>

      <label className="plant-form-label">
        Watering Frequency:
        <select
          name="wateringFrequency"
          value={data.wateringFrequency}
          onChange={handleChange}
          onBlur={(e) => validateField(e.target.name, e.target.value)} 
          className={`plant-form-select ${errors.wateringFrequency ? 'plant-input-error' : ''}`}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.wateringFrequency && <div className="plant-error-message">{errors.wateringFrequency}</div>}
      </label>

      <label className="plant-form-label">
        Fertilizing Schedule:
        <select
          name="fertilizingSchedule"
          value={data.fertilizingSchedule}
          onChange={handleChange}
          onBlur={(e) => validateField(e.target.name, e.target.value)} 
          className={`plant-form-select ${errors.fertilizingSchedule ? 'plant-input-error' : ''}`}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.fertilizingSchedule && <div className="plant-error-message">{errors.fertilizingSchedule}</div>}
      </label>
    </div>
  );
};

export default PlantForm;
