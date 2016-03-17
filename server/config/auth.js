'use strict';

// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var Token = require('../models/token');
var Employee = require('../models/Employee');
var Company = require('../models/Company');

//authorizes requests by email and password - for login only
passport.use(new BasicStrategy(
  function(email, password, callback) {
    Employee.findOne({email:req.body.email}, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false, {message: 'Invalid email.'}); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false, {message: 'Incorrect password.'}); }

        // Success
        return callback(null, user);
      });
    });
  }
));

//authorizes user requests for their own information by access token
passport.use('user-bearer', new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      Employee.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        //Success
	callback(null, user);
      });
    });
  }
));

exports.isBasicAuthenticated = passport.authenticate('basic', {session : false});
exports.isBearerAuthenticated = passport.authenticate('bearer', {session : false});
