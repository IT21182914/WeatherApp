const express = require('express');
const router = express.Router();
const { sendHourlyWeatherReport } = require('../services/emailService');
const { fetchWeatherDataByCoordinates } = require('../services/weatherService');

// Route to test email sending
router.get('/send-test-email', async (req, res) => {
  try {
    const recipientEmail = 'dilanshanuka999@gmail.com'; 

    // Fetch weather data and send it in the email
    const weatherData = await fetchWeatherDataByCoordinates(40.7128, -74.0060, 'New York'); 
    await sendHourlyWeatherReport(recipientEmail, weatherData);

    res.status(200).json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Error sending test email' });
  }
});

module.exports = router;
