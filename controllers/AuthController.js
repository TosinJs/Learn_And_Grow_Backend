const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

/**
 * Function to create and sign the token
 */
const createToken = (user, response) => {
    try {
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
        }, SECRET, { expiresIn: 3600 })
        return token
    } catch(error) {
        throw error
    }
}

/**
 * Register a new user and give him a token
 */
module.exports.registerNewUser = (request, response, next) => {
    const { user } = request.body;
    const { username, password } = request.body.user
    User.findOne({ username })  
        .then(userData => {
            if (userData) {
                throw new Error("This User already exists")
            }
            bcrypt.hash(password, 10)
            .then((hash) => {
                User.create({ ...user, password: hash })
                .then(user => {
                    console.log(user, "User Created")
                    const token = createToken(user)
                    response.status(200).json({ status: 200, message: "User Logged In", payload: token})
                })
                .catch(error => next(error))
            })
            .catch(error => next(error))
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 404
            next(transError)
        })
}

/**
 * Login a user
 * Check if user exists
 * Check if the password is correct
 * log user in and give them a cookie
 */
module.exports.loginUser = (request, response, next) => {
    const { username, password } = request.body.user;
    User.findOne({username})
        .then((user) => {
            if (!user) {
                throw new Error("This User does not exist")
            }
            bcrypt.compare(password, user.password)
                .then((val) => {
                    if (!val) {
                        throw new Error("Incorrect Password")
                    }
                    console.log("Successfully Logged In")
                    const token = createToken(user)
                    response.status(200).json({ status: 200, message: "User Logged In", payload: token})
                })
                .catch(error => next(error))
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 404
            next(transError)
        })
}