// Import the User model
// Import the User model
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { fetchWeatherDataByCoordinates, saveWeatherData } = require('../services/weatherService');


// ... rest of your code ...







// Route to store user details
router.post('/add-user', async (req, res) => {
  try {
    const { email, location } = req.body;

    // Create a new user document
    const user = new User({ email, location });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to retrieve user data by ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to update user location
router.put('/update-location/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { location } = req.body;

    // Find the user by ID and update the location
    const updatedUser = await User.findByIdAndUpdate(userId, { location }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
