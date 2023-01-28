const {Router} = require('express');
const router = Router();
const orderController = require('../controller/orderController');


router.post('/create', orderController.createOrder);
router.get('/allOrder', orderController.fetchAllOrder);





module.exports = router;