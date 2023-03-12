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
    password: {
        type:String
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
    registerVerfied: {
        type: Boolean,
        default:false
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
            type:String
        },
        IFSC:{
            type:String
        },
        actype:{
            type:String
        }
    },
    panCard: {
        holderName: {
            type:String
        },
        number: {
            type:String
        }
    },
    image: [
        {type:String}
    ],
    order: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order'
    }],
    isApproved: {
        type: String,
        default:'Not Request'
    },
    pancardURL: {
        type:String
    },
    bankURL: {
        type:String
    },
    bgImageUrl: [
        {
            type:String
        }
    ],
    rating: {
        type: Number,
        default:0
    },
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Review'
        }
    ]
})

module.exports = mongoose.model('Resturant', Resturant);