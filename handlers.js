exports.signup = function signup (req, res, next) {
  console.log(req.fields);
  res.end();
};

exports.login = function login (req, res, next) {
  console.log(req.fields);
  res.end();
};
