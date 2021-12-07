const mongoose = require("mongoose");
const Book = require("../models/Books");

/**
 * Controller to Delete a book
 */
module.exports.deleteBook = (request, response, next) => {
    const { id } = request.params
    Book.findByIdAndDelete(id)
        .then(book => {
            if (!book) {
                throw new Error("This Book is not in the Database")
            }
            console.log("Sucessfully deleted")
            response.status(200).json({ status: 200, message: "Book Deleted", payload: {}})
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 404
            next(transError)
        })
}
/**
 * Controller to Update a book
 */
module.exports.updateBook = (request, response, next) => {
    const { id } = request.params
    const { bookUpdate } = request.body
    Book.findByIdAndUpdate(id, bookUpdate)
        .then(book => {
            if (!book) {
                throw new Error("This Book is not in the Database")
            }
            console.log("Book Updated")
            response.status(200).json({ status: 200, message: "Book Updated", payload: book})
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 404
            next(transError)
        })
}
/**
 * Controller to get a single book
 */
module.exports.getBook = async (request, response, next) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        if (!book) {
            throw new Error("This Book is not in the Database")
        }
        console.log("Book Fetched")
        response.status(200).json({ status: 200, message: "Book Fetched", payload: book})
    } catch (error) {
        const transError = new Error()
        transError.message = error.message
        transError.status = 404
        next(transError)
    }
}
/**
 * Controller to get all the books available
 */
module.exports.getBooks = (request, response, next) => {
    console.log(request.query)
    Book.find(request.query)
        .then(books => {
            if (!books.length) {
                throw new Error("No Book Currently In the Database")
            }
            console.log("Books Fetched")
            response.status(200).json({status: 200 , message: "Books Fetched", payload: books })
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 401
            next(transError)
        })
}
/**
 * Controller to create a new book
 */
module.exports.postBook = (request, response, next) => {
    const { book } = request.body;
    Book.create(book)
        .then((newBook) => {
            console.log("Book created")
            response.status(200).json({ status: 200, message: "Book added",payload: newBook })
        })
        .catch(error => {
            const transError = new Error()
            transError.message = error.message
            transError.status = 401
            next(transError)
        })
}