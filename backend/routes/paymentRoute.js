const { Router } = require('express');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY)
const router = Router();


router.post('/create-checkout-session',async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
      });
    
      res.status(200).json({url:session.url})
})



module.exports = router