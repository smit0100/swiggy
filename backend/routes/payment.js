require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
const router = express.Router();
const { v4:uuidv4} = require('uuid');
const User = require('../module/UserModel')
const Order = require('../module/OrderModel')
const Resturant = require('../module/ResturantModel')
const { sendNotification } = require("../utils/PushNotification");

router.post('/', async (req, res) => {
    
  let order;
    try {
        try {
            const { customer,selectedAddress} = req.body;
            console.log(req.body);
            // customer:user._id,
            // addressId:selectedAddress
            // console.log(products,customer,total,address);
            const user = await User.findById(customer);
            const total = user.cart.total
            const resturant = user.cart.resturant
            const address = user.address.filter(item => item._id === selectedAddress)
             order = await new Order({
              products: user.cart.products,
              customer,
              total,
              address,
              resturant,
            }).save();
        
            //added in user
        
            const userUpdate = await User.findByIdAndUpdate(
              customer,
              { $push: { order: order._id } },
              {
                new: true,
              }
            );
            //add in resturant
            const rest = await Resturant.findByIdAndUpdate(
              resturant,
              {
                $push: { order: order._id },
              },
              { new: true }
            );
            console.log("=====rest++fcmmmm",rest);
            if (rest != null && rest?.fcmToken != "") {
              let datas = {
              title: "🔥Order",
              body: "🍟New order recieved..🍔",
              }
              sendNotification(rest?.fcmToken,datas)
            }
            const response = await User.findByIdAndUpdate(customer, {
              "cart.products": [],
              "cart.total": 0,
              $unset: { "cart.resturant": "" },
            });
            console.log(order)
          
          } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "something went wrong" });
          }
        const paymentIntent = await stripe.paymentIntents.create({
          amount:200,
          currency:"INR",
        });
        res.status(200).json({ message: "order created", order });
      
    } catch (e) {
        console.log(e);
        res.status(404).json({message:"something went wrong"})
    }
   
})

module.exports = router