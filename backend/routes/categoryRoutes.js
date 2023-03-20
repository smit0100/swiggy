const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/add', categoryController.addCategory);
router.get('/all', categoryController.fetchAllCategory);
router.delete('/delete',categoryController.deleteCategory);

module.exports = router