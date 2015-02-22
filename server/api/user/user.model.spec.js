var chai = require('chai');
var should = chai.should();
var expect = chai.expect;


var oriento = require('oriento');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var server = oriento(config.db);
var db = server.use(
  {
  name: 'rockridge',
  username: 'admin',
  password: 'admin'
  }
);

var User = require('./user.model');


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
        // console.log('create user return', user);
        account = user;
        done();
      });
    });

    it('should create a new user', function() {
        // console.log('account', account);
        result = account.email;
        expect(result).to.equal('testuser@gmail.com');
    });
  });

  describe('find user by email', function() {
    it('should find a user by email', function() {
      user.findByEmail('testuser@gmail.com', function(val) {
        result = val.email;
        expect(result).to.equal('testuser@gmail.com');
      });
    });
  });

  describe('delete user', function() {

    before(function(done) {
      user.deleteByEmail('testuser@gmail.com', function(val) {
        // if (val) { console.log('number Users deleted', val); };
      done();
      });
    });

    it('should delete a user', function(done) {
      user.findByEmail('testuser@gmail.com', function(val) {
        // console.log('last test', val);
        expect(val).to.equal(undefined);
        done();
      });
    });
  });

});
