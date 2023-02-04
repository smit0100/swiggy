const { Schema, default: mongoose } = require("mongoose");

const Outlet = new Schema({
    name: {
        type: String,
    },
    description: {
        type:String
    },
    isActive: {
        type: Boolean,
        default:true
    }
    
})

module.exports = mongoose.model('Outlet', Outlet);