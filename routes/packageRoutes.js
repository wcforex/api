const router = require('express').Router();
const { isAdmin, verifyToken } = require('../middleware/authorize')
const { createPackage, deletePackage, getPackage, getPackages, updatePackage } = require('../controllers/packageController');

router.get('/all', getPackages);
router.get('/:id', getPackage);
router.post('/create', isAdmin, createPackage);
router.patch('/:id', isAdmin, updatePackage);
router.delete('/:id', isAdmin, deletePackage);

module.exports = router;