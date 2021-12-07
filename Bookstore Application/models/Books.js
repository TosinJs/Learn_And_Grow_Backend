const mongoose = require("mongoose");

/**
 * Creating a Schema
 */
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    purchaseCount: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: Array
    }
}, 
{
    timestamps: true
}
);

const Book = mongoose.model("Book", BooksSchema);
module.exports = Book;