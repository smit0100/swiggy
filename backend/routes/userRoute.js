const express = require('express');
const router = express.Router()
const userController = require('../controller/userController');

router.post('/create', userController.createUser)
router.post('/verify', userController.verifyUser)
router.post('/login', userController.loginUser)



module.exports = router