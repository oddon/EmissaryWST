'use strict'

var express = require('express');
var controller = require('./payment.controller');
//var authController = require('../../config/auth');
//TODO - add in authController.isBearerAuthenticated as first callback in route

var router = express.Router();

router.post('/payment/subscription', controller.createSubscription);
router.get('/payment/subscription/:id', controller.getSubscription);

module.exports = router;
