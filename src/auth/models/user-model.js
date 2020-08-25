'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  fullname: { type: String },
  role: { type: String, required: true, default: 'user', enum:['admin', 'editor', 'writer', 'user'] },
});

user.pre('save', async function(){
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
});

user.statics.authenticateBasic = function (username, password){
  let query = {username};
  return this.findOne(query)
    .then(users => users && users.comparePassword(password))
    .catch(console.error);
};

user.methods.comparePassword = function(plainPassword){
  return bcrypt.compare(plainPassword, this.password)
    .then(valid => valid ? this : null);
};

user.statics.tokenGenerator() = async function(){
  let token = await jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  return token;
}

module.exports = mongoose.model('user', user);