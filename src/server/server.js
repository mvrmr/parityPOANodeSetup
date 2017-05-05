var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import CONST from '../CONSTANTS';

// For mongo DB / mongoose
require('./app_api/models/db');

// Routes to APIs & Application
var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
var cons = require('consolidate');
var app = express();
var session = require('express-session');
app.disable('etag');   // Disable catching

app.use(express.static('dist'));
app.use(express.static('src/client'));
app.set('views', path.join(__dirname, 'app_server', 'app_server/views'));

// view engine setup
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

// For express-session
app.use(session({secret:'xljadjkfajdf;lkafdj',resave:false,saveUninitialized:false,cookie: { secure: !true}}));

app.use('/', routes);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set up path so that any function defined in labutils.js is available from any where in the application
global.appRoot = path.resolve(__dirname);

//////////// error handlers   ////////////
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      CONST,
      userRole: req.body.userRole
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    CONST,
    userRole: req.body.userRole
  });
});

export default app;
