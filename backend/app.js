const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieSession = require('cookie-session')
const fileUpload = require('express-fileupload')
const multer = require('multer')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userRoute = require('./routes/userRoute');
const resturantRoute = require('./routes/resturantRoute');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');
const paymentRoute = require('./routes/paymentRoute');
const subCategoryRoute = require('./routes/subCategoryRoutes');
const passport = require('passport')
const passportSetup = require('./utils/passport')
const facebookSetup = require('./utils/facebook')
const orderRoute = require('./routes/orderRoutes');
const outletRoute = require('./routes/outletRoutes');
const cloudinary = require('cloudinary')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


cloudinary.config({
    cloud_name: "drwhuxvlk",
    api_key: "998582476886638",
    api_secret: "DCWAJXWe_Pu3QfASXHI2Uy80Z5w",
    secure:true
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/temp/"
}))
app.use(
    cookieSession({
        name: "session",
        keys: ['cyberwolve'],
        maxAge:24*60*60*100
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],    
    credentials:true,
}));


 
  
 

// app.use(passport.initialize());
// app.use(passport.session())

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
app.use('/payment', (req,res) => {
    res.send('hello')
});
app.use('/order', orderRoute)
app.use('/outlet', outletRoute);
app.use('/subcategory', subCategoryRoute);



app.get('/google', passport.authenticate("google", ["profile", "email"]))
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successReturnToOrRedirect: '/',
  failureRedirect:"/login"})
);


app.get('/auth/login/success', (req, res) => {
    console.log("this is data");
    console.log(req.user);
    
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successfully',
            user: req.user
            // cookies:req.cookies
       })
            
    } else {
        res.status(403).json({error:true,message:'not authorized'})
    }
})

app.get('/google/callback',
    passport.authenticate("google", {
        successReturnToOrRedirect: '/auth/login/success',
        failureRedirect:"/login/failed"
    })
)

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('login/')
})

app.get('/login/failed', (req, res) => {
    res.status(401).json({
        message:'log in failure'
    })
})
app.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: "/login/failed"
    
   
}))

app.listen(process.env.PORT, () => {
    console.log('server start');
})


// 63ce16e7b7d42e34cd93780d 