'use strict';

var User = require('./user.model');
var Plan = require('../plan/plan.model');
var auth = require('../../auth/auth.service');

exports.me = function(req, res, next) {
  var plan = new Plan;
  var temp = req.user['@rid'];
  var planRid = '#' + temp['cluster'] + ':' + temp['position'];
  plan.findByUserRid(planRid, function(plan){
    req.user.plan = JSON.parse(plan.data);
    res.json(req.user);
  });
};

exports.create = function(req, res, next) {
  var user = new User();
  user.create(req.body.email, req.body.password, function(user) {
    req.user = user;
    console.log('user', user);
    auth.setTokenCookie(req, res);
  });
};

exports.savePlan = function(req, res, next) {
  var plan = new Plan();
  plan.create(req.body['userRid'], req.body.plan, function(plan, edge) {
    console.log('plan and edge created');
  });
};

exports.getPlan = function(req, res, next) {
  var plan = new Plan();
  plan.findByUserRid(req.query.userRid, function(plan) {
  // Parsing plan data b/c we had to stringify it before for OrientDB
  res.send(JSON.parse(plan.data));
  });
};
