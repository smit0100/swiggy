const { Schema, default: mongoose } = require("mongoose");

const DeliveryBoy = new Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    number: {
        type:String
    },
 
    password: {
        type:String
    },
    isApproved: {
        type: String,
        default:'pending'
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    review: [
        [
            {
                type: mongoose.Types.ObjectId,
                ref:'Review'
            }
        ]
    ],
    rating: {
        type: String,
        default:0
    },
    averageRating: {
        type: String,
        default:0
    },
    isAvilable: {
        type: Boolean,
        default:true
    },
    registrationToken: String,
    socketId: String,
    order: [{
        type: mongoose.Types.ObjectId,
        ref:'Order'}
    ],
    fcmToken: {
        type:String
    },
})

module.exports = mongoose.model('DeliverBoy',DeliveryBoy)