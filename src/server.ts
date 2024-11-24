// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // all app listening will be here
    app.listen(config.port, () => {
      console.log(`RideRevolt is running on port ${config.port}! 🚴   ⚡`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
