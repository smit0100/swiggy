const express = require('express');
const router = express.Router()
const userController = require('../controller/userController');
const authenticateToken = require('../utils/authorize');
// const authentiCation = require('../utils/authorize')

router.post('/create', userController.createUser)
router.post('/verify', userController.verifyUser)
router.post('/login', userController.loginUser)
router.post('/addAddress', userController.addAdddress);
router.get('/fetchAllAddress', userController.fetchAllAddress);
router.get("/delteAddress", userController.deleteUserAddress)
router.post('/update', userController.updateAddress);
router.post('/changePass', userController.changePassword);
router.delete('/delete',userController.deleteUser);
router.get("/userforadmin",userController.fetchOnlyOneUser);
router.post("/updateType",userController.updateUserType);
router.get("/fetchAll",userController.fetchAllUser)
router.put('/editAddress', userController.editAddress);
router.post('/forgotpassword', userController.forgotPasswordForSentEmail);
router.post('/verfiyotp', userController.forgotPasswordForSetNewPassword);
router.get('/isExist', userController.isExist);
router.post('/loginAsAdmin', userController.loginAsAdmin);
router.get('/makeAdmin', userController.makeAdmin);
router.post('/forgotAdmin', userController.forgotAdminPassword);


module.exports = router