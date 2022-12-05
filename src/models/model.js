let mongoose = require('mongoose');

let signupSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: "First name is required"
    },

    lname: {
        type: String,
        required: "Last name is required"
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: "Gender is required"
    },

    mobile : {
        type : Number,
        require : "Mobile no is required",
        unique : true
    },

    email: {
        type: String,
        required: "Email is required",
        trim: true,
        lowercase: true,      
    },

    password: {
        type: String,
        required: 'Password is required',
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Signup", signupSchema); 