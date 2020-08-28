'use strict';

const express = require('express');
const bearerAuth = require('./auth/middleware/bearer-token-middleware');
const router = express.Router();

router.get('/secret', bearerAuth, (req,res) => {
  res.status(200).send('access allowed');
} );

module.exports = router;