'useStrict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/middleware.js');
const user = require('../models/user-model.js');

router.post('/signup', (req,res,next) =>{
  let user = req.body;
  
  // create new user
  // save it
  // response?
});

router.post('/signin', basicAuth, (req, res,next)=>{
  res.cookie('auth', req.token);
  res.send(req.token);
  // check the form of what you want to send back
});

router.get('/users', basicAuth, (req, res) => {
  res.status(200).json(user.list());
});

module.exports = router;
