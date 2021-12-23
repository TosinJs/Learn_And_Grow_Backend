const express = require("express");
const { createUser, loginUser } = require("../Controllers/AuthController");

const Router = express.Router();

Router.route("/register")
    .post(createUser)

Router.route("/login")
    .post(loginUser)
    

module.exports = Router;