const passport = require('passport');
const { signup, login } = require('./authentication');
const passportConfig = require('./passport-config');

const requireAuth = passport.authenticate('jwt', { session: false }); // prevent cookie session default


function router (app) {
  app.get('/', requireAuth, doStuff);
  app.post('/signup', signup);
  app.post('/login', login);
}

function doStuff (req, res) {
  res.send("Wooo! I'm authenticated!");
}

module.exports = router;
