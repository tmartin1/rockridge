// OrientDB
var oriento = require('oriento');
var config = require('../server/config/config');
var server = oriento(config.db);
db = server.use({
      name: 'rockridge',
      username: 'admin',
      password: 'admin'
    });

// User and Plan methods
var Plan = require('../server/api/plan/plan.model');
var User = require('../server/api/user/user.model');

// Test plan and test user
var testPlan = require('./testPlan');
var testUser = require('./testUser');

var plan = new Plan();
var user = new User();
var email = testUser.email;

// Get test user's RID, for deleting them and the plan linked to them
var userRid;
user.findByEmail(email, function(user) {
  userRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
});

// Delete test plan linked to test user
var query = 'delete vertex Plan where in_=' + userRid;

db.query(query)
.then(function(num) {
  console.log('Total ' + num + ' plans deleted');
})
.catch(function(err) {
  console.log('error', err);
});

// Delete test user
query = 'delete vertex User where email="' + email + '"';
db.query(query)
.then(function(num) {
  console.log('Total ' + num + ' users deleted');
})
.catch(function(err) {
  console.log('error', err);
});

// Create new test user
testUser = JSON.stringify(testUser);
var query = 'create vertex User content ' + testUser;
db.query(query)
.then(function(user) {});

// Get test user's RID, then create a new plan linked to it
user.findByEmail(email, function(user) {
  userRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
  console.log('user created ' + userRid);
  testPlan = JSON.stringify(testPlan);
  plan.create(userRid, testPlan, function(plan) {
    console.log('plan created', plan['@rid']);
  });
});
