'use strict';

var express = require('express');
var controller = require('./token.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.post("/login", authController.isBasicAuthenticated, controller.login);

module.exports = router;
