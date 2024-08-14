const express = require('express');
const process = require('process');
const cpuMonitor = require("../src/cpuMonitor"); // Ensure this path is correct
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const connectToDatabase = require('../src/db/connection');
const { Message } = require('./db/model/message.model'); // Adjust path if needed

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/schedule', async (req, res) => {
  const { message, day, time, timezone = 'UTC' } = req.body;

  if (!message || !day || !time) {
    return res.status(400).send('Missing required parameters.');
  }

  const [year, month, dayOfMonth] = day.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  // Create a Date object for scheduling with the specified timezone
  const scheduledDate = moment.tz({ year, month: month - 1, day: dayOfMonth, hour, minute }, timezone).toDate();
  const newMessage = new Message({
    message,
    scheduledAt: scheduledDate,
  });

  try {
    await newMessage.save();
    console.log(scheduledDate, "scheduledDate");
    res.status(200).send(`Message scheduled successfully at ${scheduledDate}.`);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Error saving message.');
  }
});

async function start() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      cpuMonitor();
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

start();
