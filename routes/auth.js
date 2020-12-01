//routes/auth.jsconst 
express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");


router.use(passport.initialize());
router.use(passport.session());

/* POST login. */
router.post('/log-in', function (req, res, next) {    
    passport.authenticate('local', 
        // we pass {session: false} in passport options, so that it wont save the user in the session
        {session: false}, 
        (err, user) => {
        if (err || !user) {
            let vari = undefined===err ? user : err;
            console.log(`ERROR ${vari}`);
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }           
           // generate a signed son web token with the contents of user object and return it in the response           
           const token = jwt.sign({user}, 'cucurucho');
           return res.json({user, token});
        });
    })(req, res);
});


module.exports = router;