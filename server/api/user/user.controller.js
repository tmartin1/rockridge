'use strict';

var User = require('./user.model');
var auth = require('../../auth/auth.service');

exports.me = function(req, res, next) {
  console.log(req.user);
  res.json({'hi':'mike'});
};

exports.create = function(req, res, next) {
  var user = new User();
  user.create(req.body.email, req.body.password, function(user) {
    console.log('created user!', user);
    auth.setTokenCookie();
  });
};
