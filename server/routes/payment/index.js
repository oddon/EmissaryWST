'use strict'

var express = require('express');
var controller = require('./payment.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.post('/payment/subscription', authController.isBearerAuthenticated, controller.createSubscription);
router.get('/payment/subscription/:id', authController.isBearerAuthenticated, controller.getSubscription);

module.exports = router;
