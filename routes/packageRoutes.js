const router = require('express').Router();
const { isAdmin } = require('../middleware/authorize')
const { createPackage, deletePackage, getPackage, getPackages, updatePackage } = require('../controllers/packageController');

router.get('/all', getPackages);
router.get('/:id', isAdmin, getPackage);
router.post('/create', isAdmin, createPackage);
router.patch('/:id', isAdmin, updatePackage);
router.delete('/:id', isAdmin, deletePackage);

module.exports = router;