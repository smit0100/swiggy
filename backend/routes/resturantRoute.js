const express = require('express');
const router = express.Router();
const resturantController = require('../controller/ResturantController');



router.post("/register", resturantController.register);
router.post("/verify", resturantController.verfiyResturant)
router.post('/login', resturantController.loginResturant);


router.get("/fetchAll", resturantController.fetchAllResturants)
router.get("/fetch/:id",resturantController.fetchResturant)
router.get('/products',resturantController.fetchResturantAllProduct)
router.post("/add", resturantController.createResturnat);
router.post("/approve/:id",resturantController.approveResturant)
router.post("/reject/:id", resturantController.rejectResturant)
router.get('/fetchAllActive', resturantController.fetchAllApprovedResturant);
router.get('/status', resturantController.resturantStatus);
router.get('/allProduct', resturantController.fetchAllProduct);
router.get('/allOrder', resturantController.fetchAllResturantOrder);
router.get('/getAllPending',resturantController.getAllResturant);
router.get('/allResturantOrder', resturantController.fetchAllResturantOrder);
router.get('/updateOrderStatus', resturantController.acceptOrder)
router.get('/rejectedResturant',resturantController.rejectedResturant)


    



module.exports = router;