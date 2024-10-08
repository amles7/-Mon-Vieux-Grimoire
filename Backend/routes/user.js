const express = require ('express')
const router = express.Router();
const usercontrollers = require ("../controllers/user")

router.post('/signup', usercontrollers.signup);
router.post('/login', usercontrollers.login);


module.exports = router;