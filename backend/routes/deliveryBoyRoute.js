const { Router } = require('express');
const router = Router();
const deliveryBoyController = require('../controller/deliveryBoyController')

router.post('/register', deliveryBoyController.register);
router.post('/verify', deliveryBoyController.verify);
router.post('/login', deliveryBoyController.login);
router.patch('/accept', deliveryBoyController.accept)
router.patch('/reject', deliveryBoyController.reject)
router.get('/fetchall', deliveryBoyController.fetchAll);
router.post('/acceptfromresturant', deliveryBoyController.receiveFoodFromResturant)
router.post('/deliver', deliveryBoyController.deliverFoodForCustomer);
router.get('/allorder', deliveryBoyController.allOrder)
router.get('/fetchpending', deliveryBoyController.fetchPending);
router.get('/fetchaccepted',deliveryBoyController.fetchAllAccepted)
router.get('/fetchrejected',deliveryBoyController.fetchAllRejected)
router.post('/addReview', deliveryBoyController.addReview);
router.delete('/delete', deliveryBoyController.deleteDeliveryBoy);
router.post('/forgotpassword', deliveryBoyController.forgotPasswordForSentEmail);
router.post('/verfiyotp', deliveryBoyController.forgotPasswordForSetNewPassword);
router.put('/edit',deliveryBoyController.editDeliveryBoy);
router.post("/changepassword", deliveryBoyController.changePassword);
router.put('/changestatus', deliveryBoyController.makeAnAvilable);
router.put('/makeavilable',deliveryBoyController.makeAvilable);

module.exports = router