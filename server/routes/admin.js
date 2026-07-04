const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const adminController = require('../controllers/adminController');

router.use(requireAdmin);

router.get('/scripts', adminController.listScripts);
router.post('/scripts', upload, adminController.createScript);
router.put('/scripts/:id', upload, adminController.updateScript);
router.delete('/scripts/:id', adminController.deleteScript);

router.get('/categories', adminController.listCategories);
router.post('/categories', adminController.createCategory);
router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;
