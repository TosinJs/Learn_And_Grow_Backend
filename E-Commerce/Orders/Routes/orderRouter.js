const express = require("express");
const { getOrders, createOrder, getOrder, editOrder, deleteOrder } = require("../Controllers/OrderController");
const { verifyToken, verifyAdmin, verifyOwner } = require("../Middleware/auth");

const Router = express.Router();

Router.route("/")
    .get(verifyToken, verifyAdmin, getOrders)
    .post(verifyToken, createOrder)

Router.route("/:id")
    .get(verifyToken, verifyOwner, getOrder)
    .put(verifyToken, verifyAdmin, editOrder)
    .delete(verifyToken, verifyAdmin, deleteOrder)

module.exports = Router;