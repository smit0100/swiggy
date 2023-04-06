const { Schema, default: mongoose } = require("mongoose");

const Order = new Schema({
    products: [
        {
            product: {
              type: Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
                default: 1,
                  min:[1,'something wrong']
            },
          },
    ],
    customer: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    payment: {
        type: String,
    },
    total: {
        type:Number,
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
    },
    address: 
        {    area: {
                type: String,
            },
            city: {
                type:String
            },
            state: {
                type:String
            },
            pincode: {
            type:Number
            }
    },
    courierBoyotpNumber: {
        type:String
    },
    customerOtpNumber: {
      type:String  
    },
    resturanteview: {
        type: mongoose.Types.ObjectId,
        ref:"Review"
    }
    , createdAt: {
        type: Date,
        default: Date.now
      },
      isreviewGiven:{
        forResturant:{
            type:Boolean,
            default:false
        },
        forDeliveryBoy:{
            type:Boolean,
            default:false
        }
    },
    
})

module.exports = mongoose.model('Order', Order);