const { Schema, Mongoose, default: mongoose } = require("mongoose");

const Review = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    userName: {
        type:String
    },
    resturant: {
        type: mongoose.Types.ObjectId,
        ref:'Resturant'
    },
    deliveryBoyId:{
        type:mongoose.Types.ObjectId,
        ref:'DeliverBoy'
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        ref:"Order"
    },
    review: {
        type:String
    },
    star: {
        type:String
    },
    deliveryBoyId: {
        type: mongoose.Types.ObjectId,
        ref:"DeliverBoy"
    },
    itsFor: {
        type:String
    }
})

module.exports = mongoose.model('Review', Review);