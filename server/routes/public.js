const express = require('express');
const router = express.Router();
const scriptsController = require('../controllers/scriptsController');

router.get('/scripts', scriptsController.listScripts);
router.get('/scripts/:slug', scriptsController.getScript);
router.get('/scripts/:slug/download', scriptsController.downloadScript);
router.get('/categories', scriptsController.listCategories);

module.exports = router;
