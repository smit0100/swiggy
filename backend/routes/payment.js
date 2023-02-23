require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
const router = express.Router();
const { v4:uuidv4} = require('uuid');



router.post('/', async (req, res) => {
    
    
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      
    } catch (e) {
        res.status(404).json({message:"something went wrong"})
    }
   
})

module.exports = router