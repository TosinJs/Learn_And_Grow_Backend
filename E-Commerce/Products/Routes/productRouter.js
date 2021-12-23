const express = require("express");
const { createProduct, editProduct, deleteProduct, getProduct, getProducts } = require("../Controllers/ProductController");
const { verifyToken, verifyAdmin, verifyOwner } = require("../Middleware/auth");

const Router = express.Router();

Router.route("/")
    .get(verifyToken, getProducts)
    .post(verifyToken, verifyAdmin, createProduct)

Router.route("/:id")
    .get(verifyToken, getProduct)
    .put(verifyToken, verifyAdmin, editProduct)
    .delete(verifyToken, verifyAdmin, deleteProduct)

module.exports = Router;