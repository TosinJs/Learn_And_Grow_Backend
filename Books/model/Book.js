const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Creating a Schema for our Book Collection
 */
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: false
    }
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
