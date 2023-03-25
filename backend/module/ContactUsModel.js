const { Schema, default: mongoose } = require('mongoose');

const Contact = new Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    number: {
        type:String
    },
    message: {
        type:String
    }
})

module.exports = mongoose.model("Contact",Contact)