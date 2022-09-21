const router = require('express').Router();
const { isAdmin, verifyToken } = require('../middleware/authorize')
const { createDeposit, getDepositByUser, getDeposits, updateDeposit } = require('../controllers/depositController');

router.get('/all', isAdmin, getDeposits);
router.get('/:userId', verifyToken, getDepositByUser);
router.post('/create', verifyToken, createDeposit);
router.patch('/:id', verifyToken, updateDeposit);

module.exports = router;