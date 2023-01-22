const { Schema, default: mongoose } = require("mongoose");

const User = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type:String
    },
    number: {
        type:String,
    },
    address: {
        type: String
    },
    order: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Order'
        }
    ],
    type: {
        type: String,
        default:'customer'
    },
    bankDetails: {
        type: mongoose.Types.ObjectId,
        ref:'BankDetails'
    },
    verified: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('User', User);