const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController')

router.get('/:userId', cartController.fetchCartItem);
router.post("/add",
    cartController.addProduct,
    cartController.itemAlreadyExistUpdateQuantity
)
router.patch('/addQuantity', cartController.addCartItemquantity)
router.patch('/subtractQuantity', cartController.subtractCartItemquantity,cartController.removeItem)


router.patch("/remove", cartController.removeItemCart)

router.get('/clear', (req,res) => {
    res.send('hello')
});


module.exports = router