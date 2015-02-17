'use strict';

var User = require('./user.model');
var auth = require('../../auth/auth.service');

exports.me = function(req, res, next) {
  res.json(req.user);
};

exports.create = function(req, res, next) {
  var user = new User();
  user.create(req.body.email, req.body.password, function(user) {
    req.user = user;
    auth.setTokenCookie(req, res);
  });
};
