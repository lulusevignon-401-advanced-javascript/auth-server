'use strict';

const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

const router = require('./auth/routes/routes');
const extraRouter = require('./extra-routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(extraRouter);

module.exports = {
  server: app,
  start: (port) =>{
    const PORT = port || process.env.PORT || 3002;
    app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));
  },
};