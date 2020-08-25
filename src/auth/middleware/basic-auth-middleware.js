'useStrict';

require('dotenv').config();

const base64 = require('base-64');
const user = require('../models/user-model.js');

module.exports = async (req,res,next) =>{

  if (!req.headers.authorization){ next('Invalid Login'); return;}

  let basic = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(basic).split(':');

  try{
    const validUser = await user.authenticateBasic(user, pass);
  
    req.token = user.tokenGenerator(validUser);
    req.user = user;
    next();
  } catch(err) {
    next('Invalid Login');
  }  
};
   
    
