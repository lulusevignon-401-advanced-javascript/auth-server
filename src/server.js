'use strict';

const express = require('express');
// require('dotenv').config();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const router = require('./auth/routes/routes');
const router = require('./auth/routes/routes');
const extraRouter = require('./extra-routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(extraRouter);
// require('../src/auth/routes/routes')(router);

// require('../src/auth/routes/routes')(router);

module.exports = {
  server: app,
  start: port =>{
    const PORT = port || process.env.PORT || 3002;
    app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));
  },
};