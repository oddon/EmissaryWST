'use strict';

var express = require('express');
var controller = require('./form.controller');
var authController = require('../../config/auth');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.get('/template/company/:id', authController.isBearerAuthenticated, controller.template.findByCompanyId);
router.get('/template/:adminid', authController.isBearerAuthenticated, controller.template.findByAdminId);
router.post('/template/:adminid', authController.isBearerAuthenticated, controller.template.sendByAdminId);
router.post('/template', authController.isBearerAuthenticated, controller.template.create);
router.put('/template', authController.isBearerAuthenticated, controller.template.update);
router.delete('/template/:template_id', authController.isBearerAuthenticated, controller.template.delete);

router.get('/visitorList/:form_id', authController.isBearerAuthenticated, controller.submitted_form.findById);
router.get('/visitorList', authController.isBearerAuthenticated, controller.submitted_form.findByPatientInfo);
router.post('/visitorList', authController.isBearerAuthenticated, controller.submitted_form.create);

module.exports = router;
