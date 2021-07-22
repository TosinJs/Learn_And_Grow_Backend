const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();
const { SECRET } = process.env;

//@Route GET api/auth
//@Desc get logged in users
exports.getLoggedInUser = async (request, response, next) => {
    try {
        const user = await User.findById(request.user.id).select("-password") //removes password from query
        response.json({
            statusCode: 200,
            message: "User Gotten Sucessfully",
            user
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send("Server Error")
    }
}

//@Route POST api/auth/login
//@Desc AUTH user
//@access Public
exports.loginUser = async (request, response, next) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    const { email, password } = request.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return (response.status(400).json({ statusCode:400, message: "Invalid Credentials"}))
        }
        //Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response,status(400),json({
                statusCode: 400,
                message: "Invalid Credentials"
            })
        }
        //If theres a match send payload (Signed Token)
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            SECRET,
            { expiresIn: 84000 },
            (error, token) => {
                if (error) throw error;
                response.json({
                    statusCode: 200,
                    message: "Logged in Successfully",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )
    } catch (error) {
        console.log(error)
        respnse.status(500).send("Unauthorized User")
    }
} 

