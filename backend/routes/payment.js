require('dotenv').config()
const { Route } = require('express')
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
const router = Route();
const uuid = require('uuid/v4')



router.post('/', async (req, res) => {
    const { product, token } = req.body;
    console.log('PRODUCT', product);
    console.log("token", token);
    
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amout: product.price * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description:'purchase product '
        },{idempontencyKey})
    }).then(result => res.status(200).json(result)).catch(e => console.log(e))


  
})

module.exports = router