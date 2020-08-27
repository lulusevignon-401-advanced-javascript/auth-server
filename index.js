'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');

const MONGODB_URI = 'mongodb://localhost:27017/products';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions);


server.start(3000);

// require('./src/app.js').start(process.env.PORT);