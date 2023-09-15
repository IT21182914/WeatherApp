const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const dotenv = require('dotenv'); // Import dotenv
const axios = require('axios'); // Import axios for API requests
const Weather = require('./models/Weather'); // Import the Weather model
const cron = require('node-cron');
const { sendHourlyWeatherReport } = require('./services/emailService');
const User = require('./models/User');
const testRoutes = require('./routes/testRoutes');

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(bodyParser.json());

// Use the defined routes
app.use('/users', userRoutes);
app.use('/weather', weatherRoutes);
app.use('/test', testRoutes);

const fetchLatestWeatherData = async () => {
  const apiKey = process.env.WEATHER_API;
  const defaultCoordinates = { lat: '40.7128', lon: '-74.0060' }; // Default coordinates for New York

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${defaultCoordinates.lat}&lon=${defaultCoordinates.lon}&appid=${apiKey}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest weather data:', error);
    throw error;
  }
};

// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    const users = await User.find(); // Fetch all users

    // Iterate through each user
    for (const user of users) {
      const weatherData = await fetchWeatherDataByLocation(user.location); // Fetch weather data for the user's location
      sendHourlyWeatherReport(user.email, weatherData); // Send weather report to the user
    }
  } catch (error) {
    console.error('Error sending hourly weather reports:', error);
  }
});


// Connect to MongoDB using the ATLAS_URI environment variable
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Start listening after MongoDB connection is established
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});

// Export the app and server objects
module.exports = { app, server };
