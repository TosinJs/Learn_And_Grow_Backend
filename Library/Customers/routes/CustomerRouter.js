const express = require("express");
const Router = express.Router();
const { getCustomers, createCustomer, deleteCustomer, getCustomer } = require("../controller/CustomerController");

/**
 * Customer Routes
 */
Router.route("/")
    .get(getCustomers)
    .post(createCustomer)

Router.route("/:id")
    .get(getCustomer)
    .delete(deleteCustomer)

module.exports = Router;