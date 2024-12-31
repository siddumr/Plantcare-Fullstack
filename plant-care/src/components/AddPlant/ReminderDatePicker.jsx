import React from "react";

const ReminderDatePicker = ({ onChange }) => {
  const handleSelect = (field, value) => {
    onChange(field, value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Watering Reminder:
        <select
          onChange={(e) => handleSelect("wateringFrequency", e.target.value)}
          style={{ marginLeft: "10px", marginBottom: "10px", display: "block" }}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <label>
        Fertilizing Reminder:
        <select
          onChange={(e) => handleSelect("fertilizingSchedule", e.target.value)}
          style={{ marginLeft: "10px", marginBottom: "10px", display: "block" }}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
    </div>
  );
};

export default ReminderDatePicker;
