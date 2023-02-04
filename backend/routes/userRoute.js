const express = require('express');
const router = express.Router()
const userController = require('../controller/userController');

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

module.exports = router