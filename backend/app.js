const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieSession = require('cookie-session')

const userRoute = require('./routes/userRoute');
const resturantRoute = require('./routes/resturantRoute');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');
const paymentRoute = require('./routes/paymentRoute');
const passport = require('passport')
const passportSetup = require('./utils/passport')

app.use(
    cookieSession({
        name: "session",
        keys: ['cyberwolve'],
        maxAge:24*60*60*100
    })
)


app.use(passport.initialize());
app.use(passport.session())
app.use(cors({
    credentials:true
}));
mongoose.connect(process.env.MONGOOSE_URL, () => {
    console.log('connected');
})


app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))


app.use('/user', userRoute);
app.use('/resturant', resturantRoute)
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use("/cart", cartRoute)
app.use('/payment', paymentRoute);

app.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "successfully loged in",
            user:req.user
        })
            
    } else {
        res.status(403).json({error:true,message:'not authorized'})
    }
})

app.get('/google/callback',
    passport.authenticate("google", {
        successReturnToOrRedirect: 'http://localhost:3000',
        failureRedirect:"/login/failed"
    })
)

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/')
})

app.get('/login/failed', (req, res) => {
    res.status(401).json({
        message:'log in failure'
    })
})
app.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: 'http://localhost:3000/',
    failureRedirect:"/login/failed"
}))

app.listen(process.env.PORT, () => {
    console.log('server start');
})


// 63ce16e7b7d42e34cd93780d 