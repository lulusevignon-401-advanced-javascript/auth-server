'useStrict';

require('dotenv').config();

const base64 = require('base-64');
const User = require('../models/user-model');

module.exports = async (req,res,next) =>{
  console.log('in middleware', req.headers.authorization );

  const errorObject = { 'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized' };

  // if (!req.headers.authorization){ next('Invalid Login'); return;}

  let encodedPair = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(encodedPair).split(':');
  
  
  
  try {
    const validUser = await User.authenticateBasic(user, pass);
    console.log('valid user', validUser);
    req.token = validUser.tokenGenerator();
    // req.user = user;
    next();
  } catch(err) {
    next(errorObject);
  }  
};
   
    
