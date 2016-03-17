'use strict';

var tokenfile = require('../../models/token');

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
    return res.status(200).json(t.toJSON());
  });
};
