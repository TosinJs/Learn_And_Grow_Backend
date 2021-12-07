const express = require('express');
const authController = require("../controllers/AuthController");

const Router = express.Router();

Router.post("/signup", authController.registerNewUser);
Router.post("/login", authController.loginUser);

module.exports = Router;
