const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/add', productController.createProduct);
router.get('/fetchAll', productController.fetchAllProduct);
router.get('/allResturantProduct', productController.allResturantProduct);
router.put('/update', productController.updateProduct);
router.get('/deleteProduct',productController.isActive)


module.exports = router
