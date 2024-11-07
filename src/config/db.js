const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
