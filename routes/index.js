var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  if (res.locals.currentUser){
    res.redirect('/catalog');
  } else {
    res.redirect('/users/log-in');
  }
});

module.exports = router;
