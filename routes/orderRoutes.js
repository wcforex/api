const router = require('express').Router();
const { isAdmin, verifyToken } = require('../middleware/authorize')
const { createOrder, deleteOrder, getOrder, getOrders, updateOrder } = require('../controllers/orderController');

router.get('/all', isAdmin, getOrders);
router.get('/:id', verifyToken, getOrder);
router.post('/create', verifyToken, createOrder);
router.patch('/:id', verifyToken, updateOrder);
router.delete('/:id', isAdmin, deleteOrder);

module.exports = router;