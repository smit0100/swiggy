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
        type: Number,
        default:0
    },
    noOfReview: {
        type: Number,
        default:0
    },
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ],
    imageUrl: {
        type:String
    },
    description: {
        type:String
    },
    isActive: {
        type: Boolean,
        default:true
    }
})

module.exports = mongoose.model('Product', Product);