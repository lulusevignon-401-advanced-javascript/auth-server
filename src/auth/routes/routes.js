'useStrict';


const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basic-auth-middleware.js');
const user = require('../models/user-model.js');
const oauth = require('../middleware/oauth-middleware.js');

router.post('/signup', (req,res,next) =>{
  user.save(req.body)
    .then(user => {
      let token = user.tokenGenerator(user);
      res.status(200).send(token);
    })
    .catch(e => { res.status(403).send('Error Creating User'); });
});

router.post('/signin', basicAuth, (req, res,next)=>{
  res.cookie('auth', req.token);
  res.status(200).json({
    token: req.token,
    user: req.user,
  });
  // res.send(req.token);
  // check the form of what you want to send back
});

router.get('./oauth', oauth,  (req, res,next) => {
  res.status(200).json(user.list());
});

router.get('/users', basicAuth, (req, res) => {
  user.find()
    .then(info => {
      res.status(200).json(info);
    });
  // res.status(200).json(user.list());
});


module.exports = router;
