const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const Token = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "User",
         
    },
    token: {
        type: Number,
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires:3600 //1 hour
    }
})

module.exports = mongoose.model('Token', Token);