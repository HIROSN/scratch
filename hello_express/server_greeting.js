'use strict';

var express = require('express');
var http    = require('http');
var app = express();

app.get('/greeting', function(req, res) {
  var data = {
    message: 'hello world'
  };

  res.json(data);
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Server started on port', port);
});
