'use strict';

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/wwwroot'));
app.listen(process.env.PORT || 5000);
