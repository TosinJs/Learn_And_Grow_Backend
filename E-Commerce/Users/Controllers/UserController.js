const CryptoJS = require("crypto-js");
const User = require("../Models/User");
require("dotenv").config();
const { PASS_SEC } = process.env;

module.exports.getUsers = async (req, res, next) => {
    const { query } = req
    try {
        const users = await User.find({})
        if (!users.length) {
            throw new Error("No Users in this Database")
        }
        res.status(201).json({ status: 201, message: "Users Gotten", payload: users})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        if (!user) {
            throw new Error("User Not Found")
        }
        const { password: lol, ...others } = user
        res.status(201).json({status: 201, message: "User FOund", payload: others})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
};

module.exports.editUser = async (req, res, next) => {
    const { password, email } = req.body;
    const { id } = req.params
    if (!password && !user) {
        return res.status(403).json({
            status: 403,
            message: "No Access",
        })
    }
    try {
        update = {
            ...(password && { password: CryptoJS.AES.encrypt(password, PASS_SEC).toString() }),
            ...(email && {email})
        }
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true })
        if (!updatedUser) {
            throw new Error("User Not Found")
        }
        const { password: lol, ...others } = updatedUser._doc;
        console.log("Editted Successfully")
        res.status(200).json({ status: 200, message: "Edited Sucessfully", payload: others})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
};

module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await User.findByIdAndDelete(id)
        if (!result) {
            throw new Error("User Not Found")
        }
        const { password: lol, ...others} = result
        res.status(201).json({ status: 201, message: "Sucessfully Deleted", payload: others })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}