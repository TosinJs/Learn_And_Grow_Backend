const express = require("express");
const { getCarts, createCart, getCart, editCart, deleteCart } = require("../Controllers/CartController");
const { verifyToken, verifyAdmin, verifyOwner } = require("../Middleware/auth");

const Router = express.Router();

Router.route("/")
    .get(verifyToken, verifyAdmin, getCarts)
    .post(verifyToken, createCart)

Router.route("/:id")
    .get(verifyToken, verifyOwner, getCart)
    .put(verifyToken, verifyOwner, editCart)
    .delete(verifyToken, verifyOwner, deleteCart)

module.exports = Router;