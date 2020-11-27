var User = require('../models/user');

const { body,validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

exports.sign_up_get = (req, res) => res.render("sign_up_form");

exports.sign_up_post =[
    body('username', 'invalid username').trim().isLength({ min: 1 }).escape(),
    body('password', 'invalid password').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {

        const errors = validationResult(req);

        const user = new User({
          username: req.body.username,
          password: req.body.password
        });
        
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('sign_up_form', { errors: errors.array()});
            return;
        } else {
            // Data from form is valid.
            // Check if User with same username already exists.
            User.findOne({ 'username': req.body.username })
            .exec( function(err, found_user) {
                if (err || found_user) { return next(err); }
                else {
                    bcrypt.hash( user.password, 10, (err, hashedPassword) => {
                        // if err, do something
                        if (err) { return next(err); }
                        // otherwise, store hashedPassword in DB
                        user.password = hashedPassword;
                        user.save(function (err) {
                            if (err) { return next(err); }
                            // User saved. 
                            res.redirect("/");
                        });
                    });
                }  
            });
        }
    }
] 


exports.log_in_get = (req, res) => res.render("log_in_form");

exports.get_log_out = (req, res) => {
    req.logout();
    res.redirect("/");
  }





