'use strict';

const User = require('../models/user-model.js');

module.exports = async (req, res,next) => {
  if (!req.headers.authorization) { next('Invalid Login: Missing Headers'); return; }

  let token = req.headers.authorization.split(' ').pop();

  try {

    const validUser = await User.authenticateToken(token);

    req.user = validUser;

    req.user = {
      username: validUser.username,
      fullname: validUser.fullname,
      email: validUser.email,
      capabilities: validUser.capabilities,
    };

    next();

  } catch (err) {

    next('Invalid Login');
  }
};