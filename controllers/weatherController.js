const axios = require('axios');
const WeatherData = require('../models/WeatherData');

// Function to fetch weather data and store it in the database
exports.fetchAndStoreWeatherData = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const weatherData = response.data;

    // Create a new document and save it to the database
    const newWeatherData = new WeatherData({
      location: `${lat}, ${lon}`,
      temperature: weatherData.main.temp,
      weatherConditions: weatherData.weather[0].description,
      windSpeed: weatherData.wind.speed,
      humidity: weatherData.main.humidity,
    });

    await newWeatherData.save();

    console.log('Weather data saved to the database.');

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
