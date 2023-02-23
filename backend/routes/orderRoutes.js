const {Router} = require('express');
const router = Router();
const orderController = require('../controller/orderController');

router.get('/:userId', orderController.fetchUserOrder);
router.post('/create', orderController.createOrder);
router.get('/allOrder', orderController.fetchAllOrder);





module.exports = router;