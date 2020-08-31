'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, mongooseOptions);


require('./src/server.js').start(process.env.PORT);