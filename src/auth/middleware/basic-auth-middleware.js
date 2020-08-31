'useStrict';


const base64 = require('base-64');
const User = require('../models/user-model');

module.exports = async (req,res,next) =>{
  console.log('in middleware', req.headers.authorization );

  const errorObject = { status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password' };

  if (!req.headers.authorization){ next(errorObject); return;}

  let encodedPair = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(encodedPair).split(':');
  

  try {
    const validUser = await User.authenticateBasic(user, pass);
    console.log('valid user', validUser);
    req.token = validUser.generateToken();
    
    next();
  } catch(err) {
    next(errorObject);
  }  
};
   
    
