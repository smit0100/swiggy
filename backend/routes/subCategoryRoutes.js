const subCategoryController = require('../controller/subCategoryController');
const { Router } = require('express');
const router = Router();

router.post("/add", subCategoryController.addCategory)
router.get('/all', subCategoryController.fetchAllSubCategory);
router.get('/getAll', subCategoryController.getAllSubCategory);
router.delete('/delete', subCategoryController.deleteSubCategory);
router.put('/edit',subCategoryController.editSubCategory);

module.exports = router