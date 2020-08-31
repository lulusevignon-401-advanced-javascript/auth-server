'useStrict';


const express = require('express');
const router = express.Router();

const User = require('../models/user-model.js');
const basicAuth = require('../middleware/basic-auth-middleware.js');
const oauth = require('../middleware/oauth-middleware.js');


router.post('/signup', async (req,res, next) =>{
  console.log('in signup route');
  console.log('request body', req.body);
  
  const user = await User.create(req.body);
  const token = user.generateToken();

  const responseBody = {
    token,
    user,
  };
  res.send(responseBody);

});
  
router.post('/signin', basicAuth, (req, res, next)=>{
  
  res.cookie('auth', req.token);
  res.set('token', req.token);
  res.send({
    token: req.token,
    user: req.user,
  });
});
  
router.get('/oauth', oauth,  (req, res,next) => {
  // res.status(200).json(User.list());
  res.status(200).send(req.token);
});


module.exports = router;
