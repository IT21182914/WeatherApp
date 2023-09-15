const axios = require('axios');
const nodemailer = require('nodemailer');
const apiKey = '02d6e8f83571a5600e97a53472e654ce'; 
const Weather = require('../models/Weather');

// Create a transporter with your email service settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rohiniwijesekara68@gmail.com', // Your Gmail email address
    pass: 'vyjs lhcb zbaa jrsx', // Your Gmail password or an app-specific password
  },
});

// Function to send hourly weather reports
const sendHourlyWeatherReport = async (recipientEmail, weatherData) => {
  // Format the weatherData object into a string
  const formattedWeatherData = JSON.stringify(weatherData, null, 2);

  const mailOptions = {
    from: 'rohiniwijesekara68@gmail.com', // Should match the user in auth
    to: recipientEmail,
    subject: 'Hourly Weather Report',
    text: `Hourly weather report:\n${formattedWeatherData}`, // Use the formatted data
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Hourly weather report sent to:', recipientEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const fetchWeatherDataByCoordinates = async (lat, lon, city) => {
  try {
    // Use Axios to make a request to OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${city}&appid=${apiKey}`
    );

    // Extract and return the weather data from the API response
    const weatherData = response.data;

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Function to save weather data to the database
const saveWeatherData = async (location, temperature, humidity) => {
  try {
    // Create a new Weather document using the model
    const weatherData = new Weather({
      location,
      temperature,
      humidity,
      // Add more fields as needed
    });

    // Save the weather data to the database
    await weatherData.save();

    console.log('Weather data saved to the database.');
  } catch (error) {
    console.error('Error saving weather data:', error);
    throw error;
  }
};

// Function to fetch weather data by location
const fetchWeatherDataByLocation = async (location) => {
  try {
    // Use Axios to make a request to OpenWeatherMap API by location
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );

    // Extract and return the weather data from the API response
    const weatherData = response.data;

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data by location:', error);
    throw error;
  }
};

module.exports = { fetchWeatherDataByCoordinates, saveWeatherData, fetchWeatherDataByLocation, sendHourlyWeatherReport };
