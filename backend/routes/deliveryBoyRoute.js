const { Router } = require('express');
const { model } = require('mongoose');
const router = Router();
const deliveryBoyController = require('../controller/deliveryBoyController')

router.post('/register', deliveryBoyController.register);
router.post('/verify', deliveryBoyController.verify);
router.post('/login', deliveryBoyController.login);


module.exports = router