import React, { useState } from "react";
import { FaLeaf, FaWater, FaCalendarAlt, FaInfoCircle, FaImage } from "react-icons/fa";
import "./AddPlant.css";
import NavBar from "../Navbar/NavBar";

const AddPlantPage = () => {
  const [plantData, setPlantData] = useState({
    name: "",
    type: "",
    wateringFrequency: "",
    fertilizingSchedule: "",
    description: "",
    lightRequirements: "",
    healthStatus: "healthy",
    plantingDate: "",
    lastWateredDate: "", // Added field
    plantImage: null, // To hold the image file
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setPlantData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleImageChange = (e) => {
    setPlantData((prev) => ({ ...prev, plantImage: e.target.files[0] }));
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (!value && name !== "plantImage") {
      newErrors[name] = "This field is required.";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleSave = async () => {
    let newErrors = {};

    // Validate all fields
    Object.keys(plantData).forEach((key) => {
      if (!plantData[key] && key !== "plantImage") {
        newErrors[key] = "This field is required.";
      }
    });

    setErrors(newErrors);

    // If there are errors, stop the submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(plantData).forEach((key) => {
        if (key === "plantImage") {
          if (plantData[key]) {
            formData.append(key, plantData[key]);
          }
        } else {
          formData.append(key, plantData[key] || "");
        }
      });

      const response = await fetch("http://localhost:5000/api/plants/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Plant saved successfully:", data);

      // Reset the form upon success
      resetForm();
      alert("Plant added successfully!");
    } catch (error) {
      console.error("Error saving plant:", error);
      alert("An error occurred while saving the plant. Please try again.");
    }
  };

  const resetForm = () => {
    setPlantData({
      name: "",
      type: "",
      wateringFrequency: "",
      fertilizingSchedule: "",
      description: "",
      lightRequirements: "",
      healthStatus: "healthy",
      plantingDate: "",
      lastWateredDate: "", // Reset field
      plantImage: null,
    });
    setErrors({});
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel and discard all changes?")) {
      resetForm();
    }
  };

  return (
    <div>
      <NavBar />
      <div className="add-plant-page-container">
        <div className="add-plant-form-container">
          <h2 className="add-plant-page-title">Add a New Plant</h2>

          <div className="plant-form-container">
            <label className="plant-form-label">
              <FaLeaf /> Plant Name:
              <input
                type="text"
                name="name"
                value={plantData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`plant-form-input ${errors.name ? "plant-input-error" : ""}`}
              />
              {errors.name && <div className="plant-error-message">{errors.name}</div>}
            </label>

            <label className="plant-form-label">
              <FaInfoCircle /> Plant Type:
              <input
                type="text"
                name="type"
                value={plantData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className={`plant-form-input ${errors.type ? "plant-input-error" : ""}`}
              />
              {errors.type && <div className="plant-error-message">{errors.type}</div>}
            </label>

            <label className="plant-form-label">
              <FaWater /> Watering Frequency (in days):
              <input
                type="number"
                name="wateringFrequency"
                value={plantData.wateringFrequency}
                onChange={(e) => handleInputChange("wateringFrequency", e.target.value)}
                className={`plant-form-input ${errors.wateringFrequency ? "plant-input-error" : ""}`}
              />
              {errors.wateringFrequency && <div className="plant-error-message">{errors.wateringFrequency}</div>}
            </label>

            <label className="plant-form-label">
              <FaCalendarAlt /> Fertilizing Schedule:
              <select
                name="fertilizingSchedule"
                value={plantData.fertilizingSchedule}
                onChange={(e) => handleInputChange("fertilizingSchedule", e.target.value)}
                className={`plant-form-select ${errors.fertilizingSchedule ? "plant-input-error" : ""}`}
              >
                <option value="">Select</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.fertilizingSchedule && <div className="plant-error-message">{errors.fertilizingSchedule}</div>}
            </label>

            <label className="plant-form-label">
              Description:
              <textarea
                name="description"
                value={plantData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`plant-form-input ${errors.description ? "plant-input-error" : ""}`}
              />
              {errors.description && <div className="plant-error-message">{errors.description}</div>}
            </label>

            <label className="plant-form-label">
              Light Requirements:
              <input
                type="text"
                name="lightRequirements"
                value={plantData.lightRequirements}
                onChange={(e) => handleInputChange("lightRequirements", e.target.value)}
                className={`plant-form-input ${errors.lightRequirements ? "plant-input-error" : ""}`}
              />
              {errors.lightRequirements && <div className="plant-error-message">{errors.lightRequirements}</div>}
            </label>

            <label className="plant-form-label">
              Health Status:
              <select
                name="healthStatus"
                value={plantData.healthStatus}
                onChange={(e) => handleInputChange("healthStatus", e.target.value)}
                className="plant-form-select"
              >
                <option value="healthy">Healthy</option>
                <option value="needs_attention">Needs Attention</option>
                <option value="wilting">Wilting</option>
              </select>
            </label>

            <label className="plant-form-label">
              Planting Date:
              <input
                type="date"
                name="plantingDate"
                value={plantData.plantingDate}
                onChange={(e) => handleInputChange("plantingDate", e.target.value)}
                className={`plant-form-input ${errors.plantingDate ? "plant-input-error" : ""}`}
              />
              {errors.plantingDate && <div className="plant-error-message">{errors.plantingDate}</div>}
            </label>

            <label className="plant-form-label">
              Last Watered Date:
              <input
                type="date"
                name="lastWateredDate"
                value={plantData.lastWateredDate}
                onChange={(e) => handleInputChange("lastWateredDate", e.target.value)}
                className="plant-form-input"
              />
            </label>

            <label className="plant-form-label">
              <FaImage /> Upload Image:
              <input
                type="file"
                name="plantImage"
                accept="image/*"
                onChange={handleImageChange}
                className={`plant-form-input ${errors.plantImage ? "plant-input-error" : ""}`}
              />
              {errors.plantImage && <div className="plant-error-message">{errors.plantImage}</div>}
            </label>
          </div>

          <div className="form-actions">
            <button onClick={handleSave} className="add-plant-save-button">
              Save Plant
            </button>
            <button onClick={handleCancel} className="add-plant-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantPage;
