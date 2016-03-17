'use strict';

var express = require('express');
var controller = require('./visitorList.controller');
var authController = require('../../config/auth');

var router = express.Router();

router.post("/", authController.isBearerAuthenticated, controller.createReq);
router.get("/company/:id", authController.isBearerAuthenticated, controller.getCompanyVisitorListReq);
router.delete("/company/:company_id/visitor/:visitor_id", authController.isBearerAuthenticated, controller.deleteVisitorReq);
router.delete("/:id", authController.isBearerAuthenticated, controller.deleteReq);

module.exports = router;
