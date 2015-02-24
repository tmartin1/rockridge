var chai = require('chai');
var expect = chai.expect;
var User = require('./user.model');

var oriento = require('oriento');
var config = require('../../config/config');
var server = oriento(config.db);
var db = server.use({
      name: 'rockridge',
      username: 'admin',
      password: 'admin'
    });

// Test user functions
var user = new User();
var result;

describe('User Methods', function() {

  before(function(done) {
    user.deleteByEmail('testuser@gmail.com', function(val) {
      done();
    });
  });

  var account;

  describe('create user', function() {
    before(function(done) {
      user.create('testuser@gmail.com', 'testPass', function(user) {
        account = user;
        done();
      });
    });

    it('should create a new user', function() {
        result = account.email;
        expect(result).to.equal('testuser@gmail.com');
    });
  });

  var testUser;


  describe('find user', function() {
    var testRid;

    before(function(done) {
      user.findByEmail('testuser@gmail.com', function(val) {
        testRid = '#' + val['@rid']['cluster'] + ':' + val['@rid']['position'];
        done();
      });
    });

    it('should find a user by their RID', function() {
      user.findById(testRid, function(user) {
        var idResult = user.email;
        expect(idResult).to.equal('testuser@gmail.com');
      });
    });

    it('should find a user by their email', function() {
      user.findByEmail('testuser@gmail.com', function(val) {
        expect(val.email).to.equal('testuser@gmail.com');
      });
    });
  });

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
