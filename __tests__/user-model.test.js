'use strict';

require('dotenv').config();
require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const User = require('../src/auth/models/user-model.js');

// clean db in between each test
afterEach(async () => {
  await User.deleteMany({});
});

//fake user ready to be used
const fakeUser = {
  username: 'janedoe',
  password: 'password',
  role: 'admin',
  email: 'jane@doe.com',
};

it('should save hashed password', async () => {
  const user = await new User(fakeUser).save(); //create new user with fake user data
  expect(user.username).toBe(fakeUser.username); //check if it works with right password
  expect(user.password).not.toBe(fakeUser.password); // should not match because password should be hashed
});

it('should authenticate known user', async () => {
  await new User(fakeUser).save();
  const authenticatedUser = await User.authenticateBasic(fakeUser.username, fakeUser.password );
  expect(authenticatedUser).toBeDefined();
});

it('should get null for  unknown user', async () => {
  const authenticatedUser = await User.authenticateBasic('nobody', 'unknown' );
  expect(authenticatedUser).toBeNull();
});

it('should return user when password good', async () => {
  const user = await new User(fakeUser).save();
  const comparedUser = await user.comparePassword(fakeUser.password);
  expect(user).toBe(comparedUser);
});

it('should return null when password bad', async () => {
  const user = await new User(fakeUser).save();
  const comparedUser = await user.comparePassword('wrongpassword');
  expect(comparedUser).toBeNull();
});

it('should generate a token', async () => {
  const user = await new User(fakeUser).save();
  const token = user.tokenGenerator();
  expect(token).toBeDefined();
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  expect(verifiedToken.role).toBe(user.role);
});

it('creating an existing user returns user', async () => {

  const user = await new User(fakeUser).save();

  const foundOrCreated = await User.createFromOauth(user.email);

  expect(foundOrCreated.email).toBe(user.email);
  expect(foundOrCreated.password).toBe(user.password);

});

it('creating with email returns new user', async () => {

  const foundOrCreated = await User.createFromOauth('new@new.com');

  expect(foundOrCreated.email).toBe('new@new.com');

  expect(foundOrCreated.password).not.toBe('none');

});

it('creating with null email argument is an error', async () => {

  expect.assertions(1);

  await expect(User.createFromOauth(null)).rejects.toEqual('Validation Error');

});
