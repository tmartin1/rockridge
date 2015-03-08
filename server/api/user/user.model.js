var bcrypt = require('bcrypt');

var User = function() {};

User.prototype.create = function(email, password, cb) {
  db.query('select from User where email="' + email +'"')
  .then(function(user) {
    // If an existing user is found w/the same email address, throw error.
    if (user.length > 0) {
      throw new Error('Cannot create account');
    } else {
      saltAndHash(password, null, function(data) {
        db.query('insert into User (email, password, salt, role) values (:email, :password, :salt, :role)',
          {
            params: {
              email: email,
              password: data[1],
              salt: data[0],
              role: 'user'
            }
          }
        ).then(function(userArr) {
          cb(userArr[0]);
        });
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
};

User.prototype.authenticate = function(email, password, cb) {
  db.query('select from User where email="' + email + '"')
  .then(function(user) {
    checkPassword(password, user[0], function(passwordMatch) {
      var res = passwordMatch ? user[0] : null;
      cb(res);
    });
  });
};

User.prototype.findByEmail = function(email, cb) {
  db.query('select from User where email="' + email + '"')
  .then(function(user) {
    cb(user[0]);
  });
};

User.prototype.findById = function(rid, cb) {
  var query = 'select from User where @rid=' + rid;
  db.query(query)
  .then(function(user) {
    cb(user[0]);
  });
};

User.prototype.deleteByEmail = function(email, cb) {
  var query = 'delete vertex User where email="' + email + '"';
  db.query(query)
  .then(function(data) {
    cb(data);
  });
};

var saltAndHash = function(password, salt, cb) {
  var salt = salt || bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);
  cb([salt, hashedPassword]);
};

var checkPassword = function(rawPassword, user, cb) {
  var tempArr = [];
  saltAndHash(rawPassword, user.salt, function(data) {
    console.log('salt and hash cb data', data);
    if (user.password !== data[1]) {
      throw new Error('Wrong password');
    }
    cb(user.password === data[1]);
  });
};

module.exports = User;
