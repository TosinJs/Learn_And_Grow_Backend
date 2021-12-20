const express = require("express");
const { getOrders, createOrder, getOrder } = require("../controllers/OrdersController");
const Router = express.Router();

/**
 * Get all the Orders
 */
Router.route("/")
    .get(getOrders)
    .post(createOrder)

/**
 * Get a Specific Order
 */
Router.route("/:id")
    .get(getOrder)

module.exports  = Router;