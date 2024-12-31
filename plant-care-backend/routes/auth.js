const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected Route
router.get('/protectedRoute', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});


//profile

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Profile Fetch Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update Profile Route
router.put('/profile', authMiddleware, async (req, res) => {
  const { fullName, phone, address } = req.body;

  try {
    const user = await User.findById(req.user.id); // Find user by ID

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update user's personal information
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save(); // Save updated user to DB

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile Update Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

