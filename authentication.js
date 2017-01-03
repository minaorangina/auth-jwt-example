const jwt = require('jwt-simple');
// const uuid = require('node-uuid');
const fs = require('fs');
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
  fs.readFile('fakedb.json', 'utf8', (err, file) => {
    if (err) throw err;
    let db = JSON.parse(file);

    if (!db.hasOwnProperty(username)) {
      return res.end('User does not exist');
    }
    if (!db[username] === password) {
      return res.end('Wrong username/password combination');
    }
    res.end('You are logged in!');
  });
};

function createToken (user_id) {
  const timestamp = new Date().getTime(); // date in ms. same as Date.now()
  return jwt.encode({ sub: user_id, iat: timestamp }, secret);
}
