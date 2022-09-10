const router = require('express').Router();
const { login, register, refreshToken } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/refreshToken', refreshToken);

module.exports = router;