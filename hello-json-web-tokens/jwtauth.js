'use strict';

var User = require('./user');
var jwt = require('jwt-simple');

module.exports = function(app) {
  return function(req, res, next) {
    var token = (req.body && req.body.accessToken) ||
      (req.query && req.query.accessToken) ||
      req.headers['x-access-token'];

    if (token) {
      try {
        var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

        if (decoded.exp <= Date.now()) {
          res.end('access token has expired', 400);
        }

        User.findOne({_id: decoded.iss}, function(err, user) {
          req.user = user;
          next();
        });
      } catch (err) {
        return next();
      }
    } else {
      next();
    }
  };
};
