const { Schema, default: mongoose } = require("mongoose");

const Resturant = new Schema({
    name: {
        type: String,
    },
    email: {
        type:String,
    },
    location: {
        lat: String,
        long:String
    },
    address: {
        street: {
            type:String,
        },
        area: {
            type:String
        },
        city: {
            type:String
        },
        pincode: {
            type:String
        }
    },
    category: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Category'
      }  
    ],
    
    product: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Product'
        }
    ],
    bankDetails: {
        type: mongoose.Types.ObjectId,
        ref:'BankDetails'
    },
    image: {
        type:String
    },
    order: [{
        type: mongoose.Types.ObjectId,
        ref:'Order'
    }],
    isApproved: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('Resturant', Resturant);