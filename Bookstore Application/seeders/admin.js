const User = require("../models/Users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { ADMINPASSWORD } = process.env;

module.exports.seedAdmin = () => {
    User.findOne({ role: "admin" })
        .then(admin => {
            if (admin) {
                throw new Error("Admin account already exists")
            }
            bcrypt.hash(ADMINPASSWORD, 10)
                .then(hash => {
                    User.create({
                        firstname: "Bookman",
                        lastname: "Books",
                        username: "bookman",
                        role: "admin",
                        password: hash
                    })
                        .then(user => console.log("Admin Created"))
                        .catch(error => error)
                })
                .catch(error => error)
        })
        .catch(error => error)
}
