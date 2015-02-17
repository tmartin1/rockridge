'use strict';

var express = require('express');
var User = require('../api/user/user.model');
//var config = require('../config/config');
var auth = require('../auth/auth.service');

var router = express.Router();

router.post('/login', function(req, res, next) {
  var user = new User();
  user.authenticate(req.body.email, req.body.password, function(user){
    req.user = user;
    auth.setTokenCookie(req, res);
  });
});

module.exports = router;
