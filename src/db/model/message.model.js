const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
});

// Create the model
const Message = mongoose.model('Message', messageSchema);

// Export the model
module.exports = { Message };
