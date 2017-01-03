const jwt = require('jwt-simple');
// const uuid = require('node-uuid');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { secret } = require('./config');
const { findUser, saveUser } = require('./database');


exports.signup = function signup (req, res, next) {
  console.log(req.fields);
  const username = req.fields.username;
  const password = req.fields.password;

  findUser(username, (err, user) => {
    if (user) {
      return res.end('User already exists');
    }
    saveUser(username, password, (err, success) => {
      if (success) {
        res.end(createToken(username));
      }
    });
  });
};

exports.login = function login (req, res, next) {
  // use local strategy to authenticate with username/password
  // check someones credentials
  // then give them a token.
  console.log(req.fields);
  const username = req.fields.username;
  const password = req.fields.password;
  findUser(username, (err, user) => {
    if (!user) {
      return res.end('User does not exist');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.end('Wrong password');
      }
      res.end('You are logged in!');
    });
  });
};

function createToken (user_id) {
  const timestamp = new Date().getTime(); // date in ms. same as Date.now()
  return jwt.encode({ sub: user_id, iat: timestamp }, secret);
}
