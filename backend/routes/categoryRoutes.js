const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/add', categoryController.addCategory);

module.exports = router