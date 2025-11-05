const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('../config/db');
const Favorite = require('../models/Favorite');

async function run() {
  try {
    await connectDB();
    // Ensure indexes are created/synced
    await Favorite.syncIndexes();
    console.log('Migration complete: indexes synced');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

run();