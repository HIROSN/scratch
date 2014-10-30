'use strict';

var express = require('express');
var http    = require('http');
var bodyparser = require('body-parser');
var app = express();

app.get('/greeting', function(req, res) {
  var data = {
    message: 'hello world'
  };

  res.json(data);
});

app.use(bodyparser.json());

app.post('/echo', function(req, res) {
  res.send(req.body.message + ' was what you said.');
});

app.post('/shout/:name', function(req, res) {
  res.status(201);
  res.send(req.params.name.toUpperCase() + ': ' + req.body.message);
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Server started on port', port);
});
