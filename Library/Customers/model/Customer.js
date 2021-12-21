const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Creating a Schema for our Book Collection
 */
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
