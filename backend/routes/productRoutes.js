const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/add', productController.createProduct);
router.get('/fetchAll', productController.fetchAllProduct);

module.exports = router
