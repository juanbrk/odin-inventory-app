var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
var User = require('./models/user');

const bcrypt = require('bcryptjs');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();



//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:2VfwACgKvYRGGZz@cluster0.qxd8i.mongodb.net/plantapp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        done(err);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) return done(err);
        if (!isMatch) {
          return done(null, false, { message: { password: 'Incorrect password' } });
        } else{
          // passwords match! log user in
          return done(null, user)
        }
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

/* Storing current user in res locals */
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

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
