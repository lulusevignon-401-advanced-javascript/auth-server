'useStrict';


// const express = require('express');
// const router = express.Router();

const basicAuth = require('../middleware/basic-auth-middleware.js');
const user = require('../models/user-model.js');
const oauth = require('../middleware/oauth-middleware.js');
module.exports = router => {

  router.post('/signup', (req,res) =>{
    console.log('in signin route');
    console.log('request body', req.body);
    let newuser = new user(req.body);
    // console.log('new user', newuser);
    // res.status(200).send('hello');
  
    newuser.save(req.body)
      .then(user => {
        console.log('user created in then block', user);
        user.tokenGenerator(user)
          .then(token => {
            res.status(200).json(token);

          })
          .catch(err => console.log(err));

        // console.log('token', token);
      })
      .catch(e => { 
        console.log('error', e);
        res.status(403).send('Error Creating User'); 
      });
  });
  
  router.post('/signin', basicAuth, async (req, res, next)=>{
    

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
};


// module.exports = router;
