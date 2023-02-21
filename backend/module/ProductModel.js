const { Schema, Mongoose, default: mongoose } = require("mongoose");

const Product = new Schema({
    name: {
        type:String
    },
    price: {
        type:Number
    },
    resturnat: {
        type: mongoose.Types.ObjectId,
        ref:'Resturant'  
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref:'Category'
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref:'SubCategory'
    },
    info: {
        type:String
    },
    image: {
        type:String
    },
    rating: {
        type:Number
    },
    review: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref:'User'
        },
        description: {
            type:String
        }
    }
})

module.exports = mongoose.model('Product', Product);