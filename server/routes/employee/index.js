'use strict';

var express = require('express');
var controller = require('./employee.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.get('/company/:id', authController.isBearerAuthenticated, controller.getAllEmployees);
router.get('/:id', authController.isBearerAuthenticated, controller.getById);
router.post('/', controller.insert);
router.put("/:id", authController.isBearerAuthenticated, controller.update);
router.delete("/:id", authController.isBearerAuthenticated, controller.delete);

module.exports = router;
