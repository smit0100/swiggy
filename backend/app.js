const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const resturantRoute = require('./routes/resturantRoute');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');

mongoose.connect(process.env.MONGOOSE_URL, () => {
    console.log('connected');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))


app.use('/user', userRoute);
app.use('/resturant', resturantRoute)
app.use('/category', categoryRoute);
app.use('/product',productRoute)

app.listen(process.env.PORT, () => {
    console.log('server start');
})