const subCategoryController = require('../controller/subCategoryController');
const { Router } = require('express');
const router = Router();

router.post("/add",subCategoryController.addCategory)

module.exports = router