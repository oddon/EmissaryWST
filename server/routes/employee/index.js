'use strict';

var express = require('express');
var controller = require('./employee.controller');
//var authController = require('../../config/auth');
//TODO - add in authController.isBearerAuthenticated as first callback in route
var router = express.Router();

router.get('/company/:id', controller.getAllEmployees);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
