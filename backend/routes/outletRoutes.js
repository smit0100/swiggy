const { Router } = require('express');
const router = Router();
const outletController = require('../controller/outletController');

router.get("/all", outletController.fetchAllOutlet);
router.post('/add', outletController.addOutlet);

module.exports = router;