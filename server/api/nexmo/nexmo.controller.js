'use strict';

var Nexmo = require('./nexmo.model');

exports.nexmo = function(req, res, next) {
  var nexmo = new Nexmo();
  nexmo.sendText(req.body, function(res) {
    res.send(res);
  });
};
