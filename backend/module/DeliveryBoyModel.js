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
            }
        }
    ],
    rating: {
        type: Number,
        deault:0
    },
    isAvilable: {
        type: Boolean,
        default:true
    },
    registrationToken: String,
    socketId: String,
})

module.exports = mongoose.model('DeliverBoy',DeliveryBoy)