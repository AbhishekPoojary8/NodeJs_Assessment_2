const mongoose = require('mongoose');

let cachedConnection

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const dbConnection = await mongoose.connect(`mongodb://127.0.0.1:27017/messages`);

  cachedConnection = dbConnection;
  return dbConnection;
}



module.exports = connectToDatabase;
