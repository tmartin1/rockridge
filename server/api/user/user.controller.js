'use strict';

var User = require('./user.model');
var Plan = require('../plan/plan.model');
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

exports.savePlan = function(req, res, next) {
  var plan = new Plan();
  console.log('req in user.controller', req);
  plan.create(req.body['userRid'], req.body.plan, function(p,e) {
    console.log('plan and edge created', p, e);
  });
};

exports.getPlan = function(req, res, next) {
  var plan = new Plan();
  console.log('req in user.controller', req);
  plan.findByUserRid(req.body['userRid'], function(plan) {
    console.log('plan', plan);
    return plan;
  });
};
