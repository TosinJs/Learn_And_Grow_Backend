const express = require("express");
const { getUsers, getUser, editUser, deleteUser } = require("../Controllers/StripeController");
const { verifyToken, verifyAdmin, verifyOwner } = require("../Middleware/auth");

const Router = express.Router();

Router.route("/payment")
    .post(makePayment)

module.exports = Router;