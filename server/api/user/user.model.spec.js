// Testing
var chai = require('chai');
var expect = chai.expect;

// OrientDB
var oriento = require('oriento');
var config = require('../../config/config');
var server = oriento(config.db);
db = server.use({
      name: 'rockridge',
      username: 'admin',
      password: 'admin'
    });

// Containers for methods
var User = require('./user.model');
var user = new User();

// Variables for testing
var testUser;
var testRid;


// Test user methods
describe('User Methods', function() {

  before(function(done) {
    user.deleteByEmail('testuser@gmail.com', function(val) {
      done();
    });
  });

  describe('create user', function() {
    before(function(done) {
      user.create('testuser@gmail.com', 'testPass', function(user) {
        testUser = user;
        done();
      });
    });

    it('should create a new user', function() {
      expect(testUser.email).to.equal('testuser@gmail.com');
    });
  });


  // Test find user methods
  describe('find user', function() {
    before(function(done) {
      user.findByEmail('testuser@gmail.com', function(val) {
        testRid = '#' + val['@rid']['cluster'] + ':' + val['@rid']['position'];
        done();
      });
    });

    it('should find a user by their RID', function() {
      user.findById(testRid, function(user) {
        expect(user.email).to.equal('testuser@gmail.com');
      });
    });

    it('should find a user by their email', function() {
      user.findByEmail('testuser@gmail.com', function(val) {
        expect(val.email).to.equal('testuser@gmail.com');
      });
    });
  });


  // Test delete user method
  describe('delete user', function() {
    before(function(done) {
      user.deleteByEmail('testuser@gmail.com', function(val) {
        done();
      });
    });

    it('should delete a user by their email', function(done) {
      user.findByEmail('testuser@gmail.com', function(val) {
        expect(val).to.equal(undefined);
        done();
      });
    });
  });

});
