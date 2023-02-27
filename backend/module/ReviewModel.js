const { Schema, Mongoose, default: mongoose } = require("mongoose");

const Review = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    userName: {
        type:String
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        ref:"Order"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref:'Product'
    },
    review: {
        type:String
    },
    star: {
        type:Number
    }
})

module.exports = mongoose.model('Review', Review);