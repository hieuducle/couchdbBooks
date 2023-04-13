const express = require('express');
const router = express.Router();

const siteController = require ('../controllers/SiteController');

router.use('/create', siteController.create);
router.get('/edit/:id', siteController.edit);
router.post('/store', siteController.store);
router.post('/del/:id', siteController.del);
router.post('/update/:id', siteController.update);
router.use('/', siteController.index);

module.exports = router;