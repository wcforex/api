const router = require('express').Router();
const {isAdmin, verifyToken} = require('../middleware/authorize')
const {createOrder,deleteOrder,getOrder,getOrders,updateOrder} = require('../controllers/orderController');

router.get('/all',isAdmin, verifyToken, getOrders);
router.get('/:id',isAdmin, verifyToken, getOrder);
router.post('/create',isAdmin, verifyToken, createOrder);
router.patch('/:id',verifyToken, updateOrder);
router.delete('/:id',isAdmin, verifyToken, deleteOrder);

module.exports = router;