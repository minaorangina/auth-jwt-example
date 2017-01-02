const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const { secret } = require('./config');

// tell passport where to find the JWT in the request
const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// create JWT strategy
const jwtLogin = new Strategy(options, loginStrategy);

// tell passport to use this strategy
passport.use(jwtLogin);

// strategy function
function loginStrategy (payload, done) {
  // check if user_id exists in db
  // true --> done(null, user);
  // false --> done(null, false);
  fs.readFile('./fakedb.json', 'utf8', (err, file) => {
    file = JSON.parse(file);
    if (err) return done(err);
    if (payload.sub in file) {
      return done(null, file[payload.sub]);
    }
    done(null, false);
  });
}