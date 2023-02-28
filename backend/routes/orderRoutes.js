const {Router} = require('express');
const router = Router();
const orderController = require('../controller/orderController');

router.get('/user', orderController.fetchUserOrder);
router.post('/create', orderController.createOrder);
router.get('/allOrder', orderController.fetchAllOrder);
router.get('/customer', orderController.fetchUserOrder);
router.get('/', orderController.fetchOneOrder)





module.exports = router;