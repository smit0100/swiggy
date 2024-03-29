const { Router } = require('express')
const router = Router()
const contactController = require('../controller/contactController');



router.post("/contact", contactController.fillForm);
router.get('/getallform',contactController.getallform)
router.post("/response", contactController.responseBack);
router.delete("/delete", contactController.deleteInquiry);


module.exports = router

