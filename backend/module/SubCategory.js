const { Schema, default: mongoose } = require("mongoose")

const SubCategory = new Schema({
    name: {
        type:String
    },
    description:{
        type:String,
    },
    mainCategory:{
        type: mongoose.Types.ObjectId,
        ref:"Category"
    },
    isActive: {
        type: Boolean,
        default:true
    },
    product: [{
        type: mongoose.Types.ObjectId,
        ref:'Product'
    }]
   
})

module.exports = mongoose.model('SubCategory', SubCategory);
