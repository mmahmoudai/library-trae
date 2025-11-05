const mongoose = require('mongoose');
let memoryServer = null;

const connectDB = async () => {
  try {
    if (process.env.MONGO_USE_MEMORY === 'true') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      await mongoose.connect(uri);
      console.log('MongoDB Memory Server connected');
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
};

module.exports = { connectDB, disconnectDB };