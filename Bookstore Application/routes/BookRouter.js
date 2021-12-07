const express = require("express");
const bookController = require("../controllers/BookController");
const { authenticateUser, checkAdmin } = require("../auth");

/**
 * Creating routes to:
 * get request to /books : fetch all books
 * get request to /books/:id fetch a single book by id
 * post request to /books : create a new book
 * put request to /books/:id : update a book
 * delete request to /books/:id : delete a book
 */
const Router = express.Router();

Router.route("/")
    .get(authenticateUser, bookController.getBooks)
    .post(authenticateUser, checkAdmin, bookController.postBook)

Router.route("/:id")
    .get(authenticateUser, bookController.getBook)
    .put(authenticateUser, checkAdmin, bookController.updateBook)
    .delete(authenticateUser, checkAdmin, bookController.deleteBook)

module.exports = Router;