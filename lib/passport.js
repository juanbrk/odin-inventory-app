const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var User = require('../models/user');

const bcrypt = require('bcryptjs');


passport.use(
  new LocalStrategy( (username, password, done) => {
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
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//we assume that the client will send the JWT token in Authorization Header as a Bearer Token
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'cucurucho'
},
function (jwtPayload, cb) {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return User.findOneById(jwtPayload.id)
  .then(user => {
    return cb(null, user);
  })
  .catch(err => {
    return cb(err);
  });
}));
