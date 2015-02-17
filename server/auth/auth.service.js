'use strict';

var config = require('../config/config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });


function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      var user = new User();
      user.findById(req.user.rid, function (user) {
        if (!user) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
      });
    });
}

function signToken(id) {
  return jwt.sign({ rid: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

function setTokenCookie(req, res) {
  if (!req.user) {
    return res.json(404, { message: 'Something went wrong, please try again.'});
  }
  var token = signToken(req.user['@rid'], req.user.role);
  res.json({token: token})
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.setTokenCookie = setTokenCookie;
module.exports.signToken = signToken;
