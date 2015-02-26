'use strict';

var express = require('express');
var controller = require('../user/user.controller');
// do we need this config?
var config = require('../../config/config');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/me/saveplan', auth.isAuthenticated(), controller.savePlan);
// TODO: Add update and delete plan
//router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
