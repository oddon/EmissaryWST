'use strict';

var express = require('express');
var controller = require('./company.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.post('/', controller.template.create);
router.get('/:id', authController.isBearerAuthenticated, controller.template.get);
router.get('/', authController.isBearerAuthenticated, controller.template.getAll);
router.put('/:id', authController.isBearerAuthenticated, controller.template.update);
router.delete('/:id', authController.isBearerAuthenticated, controller.template.delete);

router.put("/setting/:user", authController.isBearerAuthenticated, controller.template.resetCredentials);

module.exports = router;
