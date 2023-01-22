const { Schema, default: mongoose } = require("mongoose");

const Order = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref:'Product'
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    payment: {
        type: mongoose.Types.ObjectId,
        ref:'Payment'
    },
    resturant: {
        type: mongoose.Types.ObjectId,
        ref:'Resturant'
    },
    status: {
        type: String,
        default:'process'
    },
    deliveryBoy: {
        type: mongoose.Types.ObjectId,
        ref:'DeliverBoy'
    }
})

module.exports = mongoose.model('Order', Order);