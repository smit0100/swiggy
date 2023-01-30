const { Schema, default: mongoose } = require("mongoose");

const Resturant = new Schema({
    name: {
        type: String,
    },
    ownerName: {
        type:String
    },
    email: {
        type:String,
    },
    number:{
        type:Number,
    },
    resturantType:{
        type:String,
      
    },
    timing:{
        openAt:{
            type:String
        },
        closeAt:{
            type:String
        }
    },
    days:[
        {type:String}
    ],
    outLetType:[
        {
            type:String
        }
    ],
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
        state:{
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
        // type: mongoose.Types.ObjectId,
        // ref:'BankDetails'
        ACnumber:{
            type:Number
        },
        IFSC:{
            type:String
        },
        bankName:{
            type:String
        }
    },
    panCard:{
        type:String
    },
    passBook:{
        type:String
    },
    image: [
        {type:String}
    ],
    order: [{
        type: mongoose.Types.ObjectId,
        ref:'Order'
    }],
    isApproved: {
        type: Boolean,
        default:false
    },
    pancardURL: {
        type:String
    },
    bankURL: {
        type:String
    }
})

module.exports = mongoose.model('Resturant', Resturant);