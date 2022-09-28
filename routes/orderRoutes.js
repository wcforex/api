const router = require('express').Router();
const { isAdmin, verifyToken } = require('../middleware/authorize')
const { createOrder, deleteOrder, getOrderByUser, getOrders, updateOrder } = require('../controllers/orderController');

router.get('/all', isAdmin, getOrders);
router.get('/:userId', verifyToken, getOrderByUser);
router.post('/create', verifyToken, createOrder);
router.patch('/:id', verifyToken, updateOrder);
router.delete('/:id', isAdmin, deleteOrder);

module.exports = router;