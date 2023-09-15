const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { fetchWeatherDataByLocation, sendHourlyWeatherReport } = require('../services/weatherService');

// Route to send weather reports to all users
router.get('/send-weather-reports', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Iterate through users and send weather reports
    for (const user of users) {
      const { email, location } = user;

      // Fetch weather data for the user's location
      const weatherData = await fetchWeatherDataByLocation(location);

      // Format the weather data for the email
      const weatherMessage = formatWeatherDataForEmail(weatherData);

      // Send the weather report email
      await sendHourlyWeatherReport(email, weatherMessage);
    }

    res.status(200).json({ message: 'Weather reports sent successfully' });
  } catch (error) {
    console.error('Error sending weather reports:', error);
    res.status(500).json({ error: 'Error sending weather reports' });
  }
});

// Function to format weather data for email
const formatWeatherDataForEmail = (weatherData) => {
  const {
    name,
    weather,
    main,
    visibility,
    wind,
    clouds,
    sys: { sunrise, sunset },
  } = weatherData;

  const formattedMessage = `
Hourly Weather Report for ${name}
- Weather: ${weather[0].description}
- Temperature: ${main.temp}°F
- Feels Like: ${main.feels_like}°F
- Minimum Temperature: ${main.temp_min}°F
- Maximum Temperature: ${main.temp_max}°F
- Pressure: ${main.pressure} hPa
- Humidity: ${main.humidity}%
- Visibility: ${visibility} meters
- Wind Speed: ${wind.speed} m/s
- Wind Direction: ${wind.deg}°
- Gust Speed: ${wind.gust} m/s
- Cloud Cover: ${clouds.all}%
- Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}
- Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}
`;

  return formattedMessage;
};



module.exports = router;
