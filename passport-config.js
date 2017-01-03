const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const fs = require('fs');
const { secret } = require('./config');

// create local strategy
const localLogin = new LocalStrategy(localLoginStrategy);

function localLoginStrategy (username, password, done) {
  findUser(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return done(null, false);
    }
    if (password !== user.password) {
      return done(null, false);
    }
    return done(null, user);
  });
}

// tell passport where to find the JWT in the request
const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// create JWT strategy
const jwtLogin = new Strategy(options, loginStrategy);

// tell passport to use this strategy
passport.use(jwtLogin);


function loginStrategy (payload, done) {
  // check if user_id exists in db
  findUser(payload.sub, (err, result) => {
    if (err) throw err;
    if (result) {
      return done(null, result);
    }
    done(null, false);
  });
}

function findUser (username, callback) {
  fs.readFile('./fakedb.json', 'utf8', (err, file) => {
    if (err) return callback(err);
    file = JSON.parse(file);
    if (username in file) {
      return callback(null, { username, password: file[username] });
    }
    callback(null, false);
  });
}
