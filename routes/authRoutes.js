const router = require('express').Router();
const { login, register, refreshToken, forgetPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/refreshToken', refreshToken);
router.post('/forgot-password', forgetPassword);

module.exports = router;