const express = require('express');
const router = express.Router();
const resturantController = require('../controller/ResturantController');


router.get("/fetchAll", resturantController.fetchAllResturants)
router.get("/fetch/:id",resturantController.fetchResturant)
router.get('/products',resturantController.fetchResturantAllProduct)
router.post("/add", resturantController.createResturnat);
router.post("/approve/:id",resturantController.approveResturant)
router.post("/reject/:id", resturantController.rejectResturant)
router.get('/fetchAllActive', resturantController.fetchAllApprovedResturant);





module.exports = router;