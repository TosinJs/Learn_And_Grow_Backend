const mongoose = require("mongoose");
const Book = require("../model/Book");

//Get All the Books from the Database
module.exports.getBooks = async (request, response, next) => {
    try {
        const books = await Book.find();
        if (books.length > 0) {
            response.status(200).json({ status: 200, message: "Books Fetched", payload: books });
        } else {
            throw new Error("This Book Does Not Exist in Our Database");
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
// Create a new book and add it to the database
module.exports.createBook = async (request, response, next) => {
    const { book } = request.body
    try {
        const newBook = await Book.create(book);
        console.log("Book Added")
        response.status(200).json({ status: 200, message: "Book Added", payload: newBook });
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}
//Get a Single Book By its Id
module.exports.getBook = async (request, response, next) => {
    const { id } = request.params;
    try {
        const book = await Book.findById(id);
        if (book) {
            response.status(200).json({ status: 200, message: "Book Fetched", payload: book});
        } else {
            throw new Error("This Book Does Not Exsist on Our Database")
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
//Delete a Book By Its Id
module.exports.deleteBook = async (request, response, next) => {
    const { id } = request.params;
    try {
        const result = await Book.findByIdAndDelete(id);
        console.log(result);
        response.status(200).json({ status: 200, message: "Successfully Deleted", payload: result });
    } catch (error) {
        const newError = new Error();
        newError.message = "Book Not Found";
        newError.status = 404;
        next(newError);
    }
}