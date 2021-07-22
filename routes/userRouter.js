const express = require("express");
const Router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//Login User Routes
Router.post('/login',[
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Enter Your Password").exists()
    ],
    userController.loginUser
);
Router.get('/', auth, userController.getLoggedInUser)

module.exports = Router;
