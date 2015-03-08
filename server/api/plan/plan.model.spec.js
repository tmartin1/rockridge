// // Testing
// var chai = require('chai');
// var expect = chai.expect;
//
// // OrientDB
// var oriento = require('oriento');
// var config = require('../../config/config');
// var server = oriento(config.db);
// db = server.use({
//       name: 'rockridge',
//       username: 'admin',
//       password: 'admin'
//     });
//
// // User and Plan methods
// var Plan = require('./plan.model');
// var User = require('../user/user.model');
//
// // Containers for methods
// var plan = new Plan();
// var user = new User();
//
// // Variables for testing
// var testUser;
// var testUserRid;
// var result = null;
// var edge = null;
// var planData = {};
// planData.name = 'Test fund';
//
//
// // Test user functions
// describe('Plan Methods', function() {
//
//   before(function(done) {
//     user.create('planTest@gmail.com', 'test', function(user) {
//       testUser = user;
//       testUserRid = '#' + user['@rid']['cluster'] + ':' + user['@rid']['position'];
//       done();
//     });
//   });
//
//   // Test create methods
//   describe('Create methods', function() {
//     before(function(done) {
//       plan.create(testUserRid, planData, function(thisPlan, thisEdge) {
//         result = thisPlan;
//         edge = thisEdge;
//         done();
//       });
//     });
//
//     it('should create a new plan', function() {
//       expect(result.data.name).to.equal('Test fund');
//     });
//
//     it('should create a link to the associated user', function() {
//       edgeOut = '#' + edge.out.cluster + ':' + edge.out.position;
//       expect(edgeOut).to.equal(testUserRid);
//     });
//
//     it('should create a link to the new plan', function() {
//       edgeIn = '#' + edge.in.cluster + ':' + edge.in.position;
//       resultRid = '#' + result['@rid'].cluster + ':' + result['@rid'].position;
//       expect(edgeIn).to.equal(resultRid);
//     });
//   });
//
//
//   // Test find method
//   describe('Find method', function() {
//     before(function(done) {
//       result = null;
//       plan.findByUserRid(testUserRid, function(plan) {
//         result = plan;
//         done();
//       });
//     });
//
//     it("should find a user's plan by user RID", function() {
//       resultRid = '#' + result['in_'].cluster + ':' + result['in_'].position;
//       expect(resultRid).to.equal(testUserRid);
//     });
//   });
//
//
//   // Test delete methods
//   describe('Delete method', function() {
//     before(function(done) {
//       var expandedUserRid = testUser['@rid'];
//       plan.deleteByUserRid(expandedUserRid, function(total) {
//         // console.log('deleted ' + total + ' plans');
//       });
//       done();
//     });
//
//     it("should delete the plan linked to a user's RID", function(done) {
//       plan.findByUserRid(testUserRid, function(plan) {
//         expect(plan).to.equal(undefined);
//         done();
//       });
//     });
//   });
//
//
//   // Cleanup: Delete test user
//   after(function() {
//     user.deleteByEmail('planTest@gmail.com', function(val) {});
//   });
//
// });
