'use strict';

var express = require('express');
var controller = require('./company.controller');
//var authController = require('../../config/auth');
//TODO - add in authController.isBearerAuthenticated as first callback in route

var router = express.Router();

router.post('/', controller.template.create);
router.get('/:id', controller.template.get);
router.get('/', controller.template.getAll);
router.put('/:id', controller.template.update);
router.delete('/:id', controller.template.delete);

router.put("/setting/:user", controller.template.resetCredentials);

module.exports = router;
