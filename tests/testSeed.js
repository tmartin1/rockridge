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

var planModel = new Plan();
var userModel = new User();
var email = testUser.email;
var password = testUser.password;
var userRid;
var newUserRid;

// If test user already exists in the dB, delete their plan and them.
userModel.findByEmail(email, function(user) {
  // Check if test user already exists in dB
  if (!user) {
    // Create new test user
    userModel.create(email, password, function(user) {
      newUserRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
      console.log('New test user created:', newUserRid);

      for (var key in testUser) {
        if (key !=='email' && key !=='password') {
          query = 'update ' + newUserRid + ' set ' + key + '="' + testUser[key] + '"';
          db.query(query)
          .then(function(numValsAdded) {})
          .catch(function(err) {
            console.log('Testuser creation error:', err);
          });
        }
      }

      // Create new test plan
      planModel.create(newUserRid, JSON.stringify(testPlan), function(plan) {
        //console.log('plan created', plan['@rid']);
      });
    });
  } else {
    // Get the existing test user's RID
    userRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
    console.log('First @rid', userRid);

    // Delete test plan linked to test user's RID
    var query = 'delete vertex Plan where in_=' + userRid;

    db.query(query)
    .then(function(numPlansCreated) {

      // Delete test user by userRid
      query = 'delete vertex ' + userRid;
      db.query(query)
      .then(function(num) {
        if (num[0] == 1) {
          console.log('User ' + userRid + ' deleted');
        } else if (num[0] == 0) {
          console.log('No users deleted.');
        }

        // Create new test user
        userModel.create(email, password, function(user) {
          console.log('user', user);
          newUserRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
          console.log('New test user created:', newUserRid);

          for (var key in testUser) {
            if (key !=='email' && key !=='password') {
              query = 'update ' + newUserRid + ' set ' + key + '="' + testUser[key] + '"';
              db.query(query)
              .then(function(num) {})
              .catch(function(err) {
                console.log('Testuser creation error:', err);
              });
            }
          }

          // Create new test plan
          planModel.create(newUserRid, JSON.stringify(testPlan), function(plan) {
            console.log('Plan created:', plan['@rid']);
          });
        });
      })
      .catch(function(err) {
        console.log('New test plan creation error:', err);
      });
    });
  }
});
