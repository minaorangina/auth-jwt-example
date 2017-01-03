const fs = require('fs');
const bcrypt = require('bcrypt');

exports.findUser = function findUser (username, callback) {
  fs.readFile('./fakedb.json', 'utf8', (err, file) => {
    if (err) return callback(err);
    file = JSON.parse(file);
    if (username in file) {
      return callback(null, { username, password: file[username] });
    }
    callback(null, false);
  });
};

exports.saveUser = function saveUser (username, password, callback) {

  fs.readFile('fakedb.json', 'utf8', (err, file) => {
    if (err) throw err;
    let db = JSON.parse(file);

    bcrypt.genSalt(11, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        db[username] = hash;

        fs.writeFile('fakedb.json', JSON.stringify(db, null, 2), (err) => {
          if (err) throw err;
          callback(null, true);
        });
      });
    });
  });
}

/**
* Represents a function that encrypts the password
* @param {string} password - password to hash
* @param {Function} callback - callback function.
*/
function hashPassword (password, callback) {

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        callback(err);
      }
      callback(null, hashedPassword);
    });
}
