var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require("express-session");
var crypto = require('crypto');
require('./config/db');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');

var cors = require("cors");
var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sherrington secret app'));
app.use(session({
  secret: 'sherrington secret app',
  resave: false,
  saveUninitialized: true

}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  if(req.session.cart == undefined){
    req.session.cart = [] ;
  }
  next();
});
/*app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});*/
/*app.all('*',function(req, res, next){

//Origin is the HTML/AngularJS domain from where the ExpressJS API would be called
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');

//make sure you set this parameter and make it true so that AngularJS and Express are able to exchange session values between each other
  res.header("Access-Control-Allow-Credentials", "true");
  next();

});*/

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/categories', require('./routes/categories'));
app.use('/subcategories', require('./routes/sub_categories'));
app.use('/items', require('./routes/items'));
app.use('/lCard', require('./routes/loyalty_cards'));
app.use('/orders', require('./routes/orders'));
app.use('/contact', require('./routes/contact'));
app.use('/cart', require('./routes/carts'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
