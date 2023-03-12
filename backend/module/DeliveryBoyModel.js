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
    bankDetails: {
        type: mongoose.Types.ObjectId,
        ref:'BankDetails'
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
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref:'User'
            },
            description: {
                type:String
            },
            star: {
                type:String
            }
        }
    ],
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
    ]
})

module.exports = mongoose.model('DeliverBoy',DeliveryBoy)