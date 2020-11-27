var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');


router.get("/sign-up", user_controller.sign_up_get)
router.post("/sign-up", user_controller.sign_up_post);

router.get("/log-in", user_controller.log_in_get)

router.get("/log-out", user_controller.get_log_out);


module.exports = router;
