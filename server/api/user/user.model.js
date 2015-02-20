var oriento = require('oriento');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var db = oriento(config.db)
  .use({
      name: 'rockridge',
      username: 'admin',
      password: 'admin'
  });


// Create login methods for Users
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
      var res = passwordMatch ? user[0] : null;
      cb(res);
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


// Create methods for Plans
var Plan = function() {};

Plan.prototype.create = function(userRid, planData) {
  db.query('insert into Plan (data) values (:data)',
  {
    params: {
      data: planData
    }
  })
  .then(function(plan) {
    var temp = plan[0]['@rid'];
    var planRid = '#' + temp['cluster'] +':' + temp['position'];
    var query = 'create edge Has from ' + userRid + ' to ' + planRid;
    db.query(query)
    .then(function(edge) {
      console.log('Edge created:', edge);
      // console.log('this', db.query('select from User where @rid=#12:1'));
    })
  })
};

Plan.prototype.findByUserId = function(userRid, cb) {
  var query = 'select * from Plan where in_=' + userRid;
  db.query(query)
  .then(function(plan) {
    console.log('inFindByUserId');
    cb(plan[0]);
  });
};

Plan.prototype.revise = function(userRid) {

};

Plan.prototype.delete = function(userRid) {
  var query = 'delete vertex Plan where in_Has=' + userRid;
  db.query(query)
  .then(function(data) {
    console.log('deleted', data);
  })
};

module.exports = User;
module.exports = Plan;

var user = new User();

// user.create('def', 'xyz', function() {});

var plan = new Plan();

var planData = {};
planData.name = 'Fund for 12:63';

// plan.create('#12:63', planData);
plan.delete('#12:63');
