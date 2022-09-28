const router = require('express').Router();
const { getUser, getUsers, deleteUser, updateUser } = require('../controllers/userController');
const { isAdmin, verifyToken } = require('../middleware/authorize')

router.get('/all', isAdmin, getUsers);
router.get('/:id', isAdmin, getUser);
router.patch('/:id', verifyToken, updateUser);
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;