const { Router } = require('express');
const router = Router();
const deliveryBoyController = require('../controller/deliveryBoyController')

router.post('/register', deliveryBoyController.register);
router.post('/verify', deliveryBoyController.verify);
router.post('/login', deliveryBoyController.login);
router.patch('/accept', deliveryBoyController.accept)
router.patch('/reject', deliveryBoyController.reject)
router.get('/fetchall', deliveryBoyController.fetchAll);
router.post('/acceptfromresturant', deliveryBoyController.receiveFoodFromResturant)
router.post('/deliver', deliveryBoyController.deliverFoodForCustomer);
router.get('/allorder',deliveryBoyController.allOrder)

module.exports = router