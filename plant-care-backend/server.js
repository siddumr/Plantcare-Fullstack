const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const plantRoutes = require('./routes/plant');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Use routes from auth.js for authentication-related requests
app.use('/api/auth', authRoutes);

// Use routes from plant.js for plant-related requests
app.use('/uploads', express.static('uploads'));
app.use('/api/plants', plantRoutes);


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
