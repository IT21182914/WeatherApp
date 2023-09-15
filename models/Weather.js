const mongoose = require('mongoose');

// Define the weather data schema
const weatherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: String,     
  temperature: Number, 
  humidity: Number,     
 
  date: {
    type: Date,
    default: Date.now, 
  },
});

// Create a Weather model using the schema
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
