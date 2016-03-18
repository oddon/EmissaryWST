'use strict';

var tokenfile = require('../../models/token');
var Employee = require('../../models/Employee');

function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; i++) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.login = function(req, res) {
  //generate new token for the logged in user
  var token = new tokenfile({
    value : uid(255),
    userId : req.user._id
  });

  token.save(function(err, t) {
    if(err) {
      return res.status(400).json({error: "Could not save access token."});
    }
    var jsontoken = t.toJSON();
    Employee.findById(jsontoken.userId, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find"});
      } else {
	  var employeejson = employee.toJSON();
	  employeejson.value = t.value;
          return res.status(200).json(employeejson);
      }
    });
  });
};
