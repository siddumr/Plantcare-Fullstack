const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  wateringFrequency: { type: Number },
  fertilizingSchedule: { type: String },
  description: { type: String },
  lightRequirements: { type: String },
  healthStatus: { type: String },
  plantingDate: { type: Date },
  lastWateredDate: { type: Date, default: null },
  image: { type: String },  
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
