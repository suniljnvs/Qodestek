let mongoose = require('mongoose');

let signupSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },

    mobile : {
        type : Number,
        require : true,
        unique : true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,      
    },

    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Signup", signupSchema); 