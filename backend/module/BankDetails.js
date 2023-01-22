const { Schema, default: mongoose } = require("mongoose");

const BankDetails = new Schema({
    acNumber: {
        type:String,
    },
    ifsc: {
        type:String
    },
    acHolderName: {
        type:String
    },
    bankName: {
        type:String
    }
})

module.exports = mongoose.model('BankDetails',BankDetails)