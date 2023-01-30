const { Router } = require('express');
require('dotenv').config()
const Razorpay = require('razorpay');
const router = Router();


const razorpay = new Razorpay({
  key_id: 'rzp_test_fyWKSzZ5vqvS5b',
  key_secret: 'G90y1HVEqlAinMbczgbr3BzX'
});

router.post('/create-order', (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: 'INR',
    receipt: 'receipt_id',
    payment_capture: '0'
  };

  razorpay.orders.create(options, function(err, order) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount
      });
    }
  });
});

router.post('/capture-payment', (req, res) => {
  const options = {
    amount: req.body.amount
  };

  razorpay.payments.capture(req.body.payment_id, options, function(err, payment) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        id: payment.id,
        order_id: payment.order_id,
        amount: payment.amount
      });
    }
  });
});



module.exports = router