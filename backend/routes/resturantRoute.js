const express = require('express');
const router = express.Router();
const resturantController = require('../controller/ResturantController');


router.get("/fetchAll", resturantController.fetchAllResturants)
router.get('/products',resturantController.fetchResturantAllProduct)
router.post("/add", resturantController.createResturnat);
router.post("/approve/:id",resturantController.approveResturant)
router.post("/reject/:id",resturantController.rejectResturant)





module.exports = router;