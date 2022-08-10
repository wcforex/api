const router = require('express').Router();
const {getUser,getUsers,deleteUser,updateUser} = require('../controllers/userController');
const {isAdmin,verifyToken} = require('../middleware/authorize')

router.get('/all',isAdmin, verifyToken, getUsers);
router.get('/:id',isAdmin, verifyToken, getUser);
router.patch('/:id',verifyToken, updateUser);
router.delete('/:id',isAdmin, verifyToken, deleteUser);

module.exports = router;