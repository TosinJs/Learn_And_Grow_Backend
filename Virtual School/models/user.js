const mongoose = require("mongoose");

//Create the user Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    userRole: {
        type: String,
        enum: ["admin", "tutor", "student", "not assigned"],
        default: "not assigned"
    },
    isTutor: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)
