require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/passport');

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
const session = require("express-session");
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const authRouter = require('./routes/auth');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qxd8i.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------

/* Storing current user in res locals */
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
