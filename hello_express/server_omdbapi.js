'use strict';

var express = require('express');
var request = require('superagent');
var app = express();

app.get('/:title', function(req, res) {
  var title = req.params.title.replace(' ', '+');
  request.
    get('http://www.omdbapi.com/?s=' + title).
    end(function (err, data) {
      res.json(JSON.parse(data.text));
    });
});

app.listen(3000, function() {
  console.log('The server is running on port 3000');
});
