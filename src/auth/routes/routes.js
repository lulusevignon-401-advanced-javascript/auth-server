'useStrict';


const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basic-auth-middleware.js');
const User = require('../models/user-model.js');
const oauth = require('../middleware/oauth-middleware.js');
const bearerAuth = require('../middleware/bearer-token-middleware.js');

router.post('/signup', async (req,res, next) =>{
  console.log('in signup route');
  console.log('request body', req.body);
  // let newuser = new user(req.body);
  // console.log('new user', newuser);
  // res.status(200).send('hello');
  const user = await User.create(req.body);
  const token = user.tokenGenerator();

  const responseBody = {
    token,
    user,
  };
  res.send(responseBody);

  // newuser.save(req.body)
  //   .then(user => {
  //     console.log('user created in then block', user);
  //     user.tokenGenerator(user)
  //       .then(token => {
  //         res.status(200).json(token);

  //       })
  //       .catch(err => console.log(err));

  //     // console.log('token', token);
  //   })
  //   .catch(e => { 
  //     console.log('error', e);
  //     res.status(403).send('Error Creating User'); 
  //   });
});
  
router.post('/signin', basicAuth, (req, res, next)=>{
  
  res.cookie('auth', req.token);
  res.set('token', req.token);
  res.send({
    token: req.token,
    user: req.user,
  });
  // res.send(req.token);
  // check the form of what you want to send back
});
  
router.get('./oauth', oauth,  (req, res,next) => {
  // res.status(200).json(User.list());
  res.status(200).send(req.token)
});
  
router.get('/users', basicAuth, (req, res) => {
  User.find()
    .then(info => {
      res.status(200).json(info);
    });
  // res.status(200).json(user.list());
});

// router.get('/users', basicAuth, (req, res) => {
//   User.find()
//     .then(info => {
//       res.status(200).json(info);
//     });
//   // res.status(200).json(user.list());
// });

// router.get('/secret', bearerAuth, (req,res) => {
//   res.status(200).send('access allowed');
// } );



module.exports = router;
