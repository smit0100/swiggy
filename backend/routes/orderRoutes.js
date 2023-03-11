const {Router} = require('express');
const router = Router();
const orderController = require('../controller/orderController');

router.get('/user', orderController.fetchUserOrder);
router.post('/create', orderController.createOrder);
router.get('/allOrder', orderController.fetchAllOrder);
router.get('/customer', orderController.fetchUserOrder);
router.get('/fetchOneOrder', orderController.fetchOneOrder)
router.get('/acceptOrder', orderController.acceptOrder);
router.get('/')




module.exports = router;