var express = require('express');
var path = require('path');
var logger = require('morgan');
var parser = require('body-parser');
var app = express();


// var mongoose = require('./api/config/database');
// var routes = require('./api/config/routes')

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('PouchKotato app listening on port 3000!')
})
