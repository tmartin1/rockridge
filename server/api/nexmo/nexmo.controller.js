'use strict';

var Nexmo = require('./nexmo.model');

exports.sendText = function(req, res, next) {
  var nexmo = new Nexmo();
  nexmo.sendText(req.body, function(res) {
    res.send(res);
  });
};
