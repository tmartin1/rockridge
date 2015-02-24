var oriento = require('oriento');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var db = oriento(config.db)
  .use({
      name: 'rockridge',
      username: 'admin',
      password: 'admin'
  });

// Create methods for Plans
var Plan = function() {};

Plan.prototype.create = function(userRid, planData, cb) {
  db.query('insert into Plan (data) values (:data)',
  {
    params: {
      data: planData
    }
  })
  .then(function(plan) {
    var temp = plan[0]['@rid'];
    var planRid = '#' + temp['cluster'] + ':' + temp['position'];
    var query = 'create edge from ' + userRid + ' to ' + planRid;
    db.query(query)
    .then(function(edge) {
      cb(plan[0], edge[0]);
    });
  });
};

Plan.prototype.findByUserRid = function(userRid, cb) {
  var query = 'select * from Plan where in_=' + userRid;
  db.query(query)
  .then(function(plan) {
    cb(plan[0]);
  });
};

Plan.prototype.deleteByUserRid = function(userRid, cb) {
  db.query('delete vertex Plan where in_ = ' + userRid)
  .then(function (total) {
    cb(total);    
  });
};

module.exports = Plan;
