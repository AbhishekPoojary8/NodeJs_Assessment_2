const mongoose = require('mongoose');
const dotenv = require('dotenv');

let cachedConnection
dotenv.config();
async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }
  console.log(process.env.MONGODB_URI,"Uri")

  const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}`);

  cachedConnection = dbConnection;
  return dbConnection;
}



module.exports = connectToDatabase;
