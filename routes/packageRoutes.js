const router = require('express').Router();
const {isAdmin, verifyToken} = require('../middleware/authorize')
const {createPackage,deletePackage,getPackage,getPackages,updatePackage} = require('../controllers/packageController');

router.get('/all',isAdmin, verifyToken, getPackages);
router.get('/:id',isAdmin, verifyToken, getPackage);
router.post('/create',isAdmin, verifyToken, createPackage);
router.patch('/:id',verifyToken, updatePackage);
router.delete('/:id',isAdmin, verifyToken, deletePackage);

module.exports = router;