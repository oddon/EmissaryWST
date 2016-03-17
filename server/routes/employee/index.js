'use strict';

var express = require('express');
var controller = require('./employee.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.get('/company/:id', authController.isBearerAuthenticated, controller.getAllEmployees);
router.get('/:id', authController.isBearerAuthenticated, controller.getById);
router.post('/', authController.isBearerAuthenticated, controller.insert);
router.put("/:id", authController.isBearerAuthenticated, controller.update);
router.delete("/:id", authController.isBearerAuthenticated, controller.delete);
router.post("/login", authController.isBasicAuthenticated, controller.login);

module.exports = router;
