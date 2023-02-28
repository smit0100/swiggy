const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/add', productController.createProduct);
router.get('/fetchAll', productController.fetchAllProduct);
router.get('/allResturantProduct', productController.allResturantProduct);



module.exports = router
