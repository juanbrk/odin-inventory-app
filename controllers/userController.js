var User = require('../models/user');

const { body,validationResult } = require("express-validator");

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
                    user.save(function (err) {
                        if (err) { return next(err); }
                        // Category saved. Redirect to category detail page.
                        res.redirect("/");
                    });
                }  
            });
        }
    }
] 

