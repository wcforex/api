const router = require('express').Router();
const { isAdmin } = require('../middleware/authorize')
const { createPaymentMethod, getPaymentMethod, getPaymentMethods, updatePaymentMethod, deletePaymentMethod } = require('../controllers/paymentMethodController');

router.get('/all', isAdmin, getPaymentMethods);
router.get('/:id', isAdmin, getPaymentMethod);
router.post('/create', isAdmin, createPaymentMethod);
router.patch('/:id', isAdmin, updatePaymentMethod);
router.patch('/:id', isAdmin, deletePaymentMethod);

module.exports = router;