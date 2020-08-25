'useStrict';

const base64 = require('base-64');
const user = require('../models/user-model.js');

module.exports = (req,res,next) =>{

  if (!req.headers.authorization){ next('Invalid Login'); return;}

  let basic = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(basic).split(':');

  user.authenticateBasic(user, pass)
    .then(validUser =>{
      req.token = user.tokenGenerator(validUser);
      next();
    })
    .catch(err=> next('Invalid Login'));
};
