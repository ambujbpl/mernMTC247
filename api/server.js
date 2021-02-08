'use strict';
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db/db');
var app = express();

/**
 * { set app properties }
 *
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, './../dist')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", 'Content-Type,Accept');
  next();
});
/**
 * { routers import }
 *
 * @type       {var file }
 */
var ProductRoutes =  require('./mvc/Product/routes/ProductRoutes');

/**
 * { set api routes }
 *
 */
app.use('/',ProductRoutes);
/**
 * { ui routes index files }
 *
 */
// app.get('*', function(req, res) {
//   res.sendFile('index.html', { root: path.join(__dirname, './../dist') });
// });
// 

/**
 * { catch 404 and forward to error handler }
 *
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = process.env.PORT || 8080; // set our port

/**
 * { START THE SERVER }
 *
 */ //, '192.168.43.239'
app.listen(port, function() {
	console.log('server is running on port',port);
});

module.exports = app;