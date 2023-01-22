const { Schema, default: mongoose } = require("mongoose");

const DeliveryBoy = new Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    number: {
        type:number
    },
    bankDetails: {
        type: mongoose.Types.ObjectId,
        ref:'BankDetails'
    },
    isApproved: {
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
    }
})

module.exports = mongoose.model('DeliverBoy',DeliveryBoy)