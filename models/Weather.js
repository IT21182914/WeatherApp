const mongoose = require('mongoose');

// Define the weather data schema
const weatherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: String,     // Store the location (e.g., city name)
  temperature: Number,  // Store temperature data
  humidity: Number,     // Store humidity data
  // Add more fields as needed based on the data you want to store
  date: {
    type: Date,
    default: Date.now, // Store the date when the data is created
  },
});

// Create a Weather model using the schema
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
