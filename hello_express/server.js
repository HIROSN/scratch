var express = require('express');
var http    = require('http');

var app = express();

app.get('/', function(req, res) {
  res.send('hello world!');
});

var server = http.createServer(app);
server.listen(3000, function() {
  console.log('the server is running on port 3000');
});
