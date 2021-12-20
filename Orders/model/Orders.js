const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Creating the Schema for our Orders Collection
 */

const OrderSchema = new Schema ({
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
})

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;