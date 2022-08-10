const router = require('express').Router();
const {login, register, logout} = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);

module.exports = router;