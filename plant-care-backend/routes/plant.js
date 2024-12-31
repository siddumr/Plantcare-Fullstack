const express = require('express');
const multer = require('multer');
const Plant = require('../models/Plant');
const router = express.Router();
const mongoose = require('mongoose');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
  },
});

// Validate file type (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpg|jpeg|png|gif/;
  const extname = allowedFileTypes.test(file.mimetype);
  const mimetype = allowedFileTypes.test(file.originalname.toLowerCase());

  if (extname && mimetype) {
    return cb(null, true); // File is valid
  } else {
    return cb(new Error('Only image files are allowed.'), false); // Invalid file type
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Add Plant with Image Upload
router.post('/add', upload.single('plantImage'), async (req, res) => {
  try {
    const {
      name,
      type,
      wateringFrequency,
      fertilizingSchedule,
      description,
      lightRequirements,
      healthStatus,
      plantingDate,
      lastWateredDate, // Extract lastWateredDate from the request body
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !type ||
      !wateringFrequency ||
      !fertilizingSchedule ||
      !description ||
      !lightRequirements ||
      !plantingDate
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const plantData = {
      name,
      type,
      wateringFrequency,
      fertilizingSchedule,
      description,
      lightRequirements,
      healthStatus,
      plantingDate: new Date(plantingDate),
      lastWateredDate: lastWateredDate ? new Date(lastWateredDate) : null, // Convert to Date if provided
      image: req.file ? `/uploads/${req.file.filename}` : null, // Save image path if uploaded
    };

    const newPlant = new Plant(plantData);
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    console.error('Error saving plant:', error);
    res.status(500).json({ message: 'Failed to save plant.' });
  }
});

// Get All Plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants); // Send the list of plants to the client
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Plant
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid plant ID.' });
    }

    const result = await Plant.findByIdAndDelete(id);

    if (result) {
      return res.status(200).json({ message: 'Plant deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Plant not found.' });
    }
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

// Update Last Watered Date
router.patch('/:id/updateLastWatered', async (req, res) => {
  try {
    const { id } = req.params;
    const { lastWateredDate } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid plant ID.' });
    }

    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found.' });
    }

    // Update the last watered date
    plant.lastWateredDate = new Date(lastWateredDate);
    await plant.save();

    res.status(200).json(plant);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ message: 'Failed to update plant.' });
  }
});






module.exports = router;

