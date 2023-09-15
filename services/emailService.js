const nodemailer = require('nodemailer');

// Create a transporter with your email service settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rohiniwijesekara68@gmail.com', // Your Gmail email address
    pass: 'vyjs lhcb zbaa jrsx',
  },
});

const sendHourlyWeatherReport = async (recipientEmail, weatherData) => {
  // Extract relevant weather data
  const {
    name,
    weather,
    main,
    visibility,
    wind,
    clouds,
    sys: { sunrise, sunset },
  } = weatherData;

  // Create a formatted weather report
  const weatherReport = `
    Hourly Weather Report for ${name}
    
    **Weather:** ${weather[0].description}
    **Temperature:** ${(main.temp - 273.15).toFixed(2)}°C
    **Feels Like:** ${(main.feels_like - 273.15).toFixed(2)}°C
    **Minimum Temperature:** ${(main.temp_min - 273.15).toFixed(2)}°C
    **Maximum Temperature:** ${(main.temp_max - 273.15).toFixed(2)}°C
    **Pressure:** ${main.pressure} hPa
    **Humidity:** ${main.humidity}%
    **Visibility:** ${visibility} meters
    **Wind Speed:** ${wind.speed} m/s
    **Wind Direction:** ${wind.deg}°
    **Gust Speed:** ${wind.gust} m/s
    **Cloud Cover:** ${clouds.all}%

    **Sunrise:** ${new Date(sunrise * 1000).toLocaleTimeString()}
    **Sunset:** ${new Date(sunset * 1000).toLocaleTimeString()}
  `;

  const mailOptions = {
    from: 'rohiniwijesekara68@gmail.com', // Should match the user in auth
    to: recipientEmail,
    subject: 'Hourly Weather Report',
    text: weatherReport,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Hourly weather report sent to:', recipientEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendHourlyWeatherReport };
