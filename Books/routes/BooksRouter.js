const express = require("express");
const { getBook, getBooks, createBook, deleteBook } = require("../controller/BookControlller");
const Router = express.Router();

/**
 * Create the book routes
 */
Router.route("/")
    .get(getBooks)
    .post(createBook)
/**
 * Create Specific Book Routes
 */
Router.route("/:id")
    .get(getBook)
    .delete(deleteBook)

module.exports  = Router;