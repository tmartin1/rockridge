var oriento = require('oriento');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var server = oriento(config.db);
var db = server.use({
  name: 'rockridge',
  username: 'admin',
  password: 'admin'
});


var User = function() {};

User.prototype.create = function(email, password, cb) {
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
    }).catch(function(err) {
      console.log('error', err);
    });
  });
};

// db.on("endQuery", function(obj) {
//   console.log('obj', obj);
// });

User.prototype.authenticate = function(email, password, cb) {
  db.query('select from User where email=:email',
  {
    params: {
      email: email
    }
  })
  .then(function(user) {
    checkPassword(password, user[0], function(passwordMatch) {
      var res = passwordMatch ? user[0] : null;
      cb(res);
    });
  });
};

User.prototype.findByEmail = function(email, cb) {
  db.query('select from User where email=:email',
  {
    params: {
      email: email
    },
    limit: 1
  })
  .then(function(user) {
    cb(user[0]);
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

User.prototype.deleteByEmail = function(email, cb) {
  var query = 'delete vertex User where email="' + email + '"';
  db.query(query)
  .then(function(data) {
    cb(data[0]);
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

var user = new User();
