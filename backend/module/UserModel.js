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
    address: [
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
        }
    ],
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
    },
    cart: {
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
          total: {
            type: Number,
              default: 0,
              min:[0,'something wrong']
          },
    }
})

module.exports = mongoose.model('User', User);