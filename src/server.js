'use strict';

const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

module.exports = {
  start: port =>{
    const PORT = port || process.env.PORT || 3002;
    app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));
  },
};