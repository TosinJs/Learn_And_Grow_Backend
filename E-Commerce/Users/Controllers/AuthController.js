const User = require("../Models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PASS_SEC, JWT_KEY } = process.env;

module.exports.createUser = async (req, res, next) => {
    const { username, email, password, } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password: CryptoJs.AES.encrypt(password, PASS_SEC).toString()
        })
        console.log("User Added");
        res.status(201).json({ status: 200, message: "User Added", payload: newUser})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        let hashedPassword = CryptoJs.AES.decrypt(user.password, PASS_SEC)
        hashedPassword = hashedPassword.toString(CryptoJs.enc.Utf8)

        //Check if there is a Password Match
        if (password !== hashedPassword) {
            throw new Error("Invalid Password or Username")
        }
        //Give the User a Token
        console.log("User Found")
        const payload = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin
            }
        }
        jwt.sign(
            payload,
            JWT_KEY,
            { expiresIn: 8000},
            (error, token) => {
                if (error) throw error;
                const { password: lol, ...others} = user._doc
                res.status(201).json({ status: 200, message: "Logged In", payload: {...others, token} })
            }
        )
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}