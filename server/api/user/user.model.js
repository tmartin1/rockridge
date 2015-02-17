var oriento = require('oriento');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var db = oriento(config.db)
        .use({
            name: 'rockridge',
            username: 'admin',
            password: 'admin'
        });

var User = function() {};

User.prototype.create = function(email, password, cb) {
  saltAndHash(password, null, function(data) {
    db.query('insert into User (email, password, salt) values (:email, :password, :salt)', 
        {
        params: {
          email: email,
          password: data[1],
          salt: data[0],
          role: 'user'
        }
      })
    .then(function(user) {
      cb(user[0]);
    });
  });
};

User.prototype.authenticate = function(email, password, cb) {
  db.query('select from User where email=:email',
  {
    params: {
      email: email
    }
  })
  .then(function(user) {
    checkPassword(password, user[0], function(passwordMatch) {
      cb(passwordMatch);
    });
  });
};

User.prototype.findById = function(rid, cb) {
  db.query('select from User where @rid=:rid',
  {
    params: {
      rid: rid
    },
    limit: 1
  })
  .then(function(user) {
    cb(user[0]);
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
    cb(user.password === data[1]);
  });
};

module.exports = User;
