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

user.statics.authenticateBasic = async function(username, password){
  console.log('in basic auth methods');
  
  const user = await this.findOne({ username });
  return user && await user.comparePassword(password);
  
  // let query = username;

  // return this.findOne({username: username})
  //   .then(users => {
  //     console.log('users in authBasic', users);
  //     // users && users.comparePassword(password);
  //   })
  //   .catch(console.error);
};

user.methods.comparePassword = async function(plainPassword){
  const passwordMatch = await bcrypt.compare(plainPassword, this.password);
  return passwordMatch ? this : null;
};

user.methods.tokenGenerator = function(){
  console.log('in token Generator');
  // let token = await jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  // console.log('token ', token);
  // return token;
  // const payload = {
  //   role: this.role,
  // };

  let token = {
    id: this._id,
    role: this.role,
  };
  let options = {};
  return jwt.sign(token, process.env.JWT_SECRET, options);
};

user.statics.createFromOauth = async function(email){

  if(!email){
    return Promise.reject('Validation Error');
  }

  const user = await this.findOne({ email });
  if (user){
    return user;
  } else {
    return this.create({ username: email, password: 'none', email:email});
  }
};

user.statics.authenticateToken = function (token){

  let parsedToken = jwt.verify(token, process.env.JWT_SECRET);
  return this.findById(parsedToken.id);
};

module.exports = mongoose.model('user', user);
