'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User = require('./user');

if (process.argv.length >= 4) {
  var newUser = new User();
  newUser.username = process.argv[2];
  newUser.password = newUser.generateHash(process.argv[3]);

  db.once('open', function() {
    User.findOne({username: newUser.username}, function(err, user) {
      if (user) {
        console.log(user);
        return db.close();
      }

      newUser.save(function() {
        db.close();
        mongoose.disconnect();
        console.log(newUser);
      });
    });
  });
}
else {
  var app = express();
  app.use(bodyparser.json());
  app.set('jwtTokenSecret', process.env.SECRET_STRING || 'change this');
  var jwtauth = require('./jwtauth.js')(app);

  app.post('/jwt', [jwtauth], function(req, res) {
    if (!req.user) { return res.status(404).end(); }
    res.json({username: req.user.username});
  });

  app.post('/user/:username', function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (err || !user) {
        return res.status(404).end();
      }

      if (!req.body || !req.body.password ||
        !user.validPassword(req.body.password)) {
        return res.status(404).end();
      }

      var expires = moment().add(7, 'days').valueOf();

      var token = jwt.encode({
        iss: user.id,
        exp: expires
      }, app.get('jwtTokenSecret'));

      res.json({
        token : token,
        expires: expires,
        user: user.toJSON()
      });
    });
  });

  app.use(express.static(__dirname + '/public'));
  app.listen(process.env.PORT || 3000);
}
