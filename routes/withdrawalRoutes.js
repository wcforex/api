const router = require('express').Router();
const { isAdmin, verifyToken } = require('../middleware/authorize')
const { createWithdrawal, getWithdrawalByUser, getWithdrawals, updateWithdrawal } = require('../controllers/withdrawalController');

router.get('/all', isAdmin, getWithdrawals);
router.get('/:userId', verifyToken, getWithdrawalByUser);
router.post('/create', verifyToken, createWithdrawal);
router.patch('/:id', verifyToken, updateWithdrawal);

module.exports = router;