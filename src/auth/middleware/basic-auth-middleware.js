'useStrict';

require('dotenv').config();

const base64 = require('base-64');
const user = require('../models/user-model');

module.exports = async (req,res,next) =>{
  console.log('in middleware', req.headers.authorization );

  if (!req.headers.authorization){ next('Invalid Login'); return;}

  let basic = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(basic).split(':');
  
  
  
  try {
    const validUser = await user.authenticateBasic(user, pass);
    console.log('valid user', validUser);
    req.token = user.tokenGenerator(validUser);
    req.user = user;
    next();
  } catch(err) {
    next('Invalid Login in catch');
  }  
};
   
    
