const mongoose = require("mongoose");
const Order = require("../model/Orders");

//Get All the Orders from the Database
module.exports.getOrders = async (request, response, next) => {
    try {
        const orders = await Order.find();
        if (orders.length > 0) {
            response.status(200).json({ status: 200, message: "Orders Fetched", payload: orders });
        } else {
            throw new Error("No orders in Our Database");
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
// Create a new Order and add it to the database
module.exports.createOrder = async (request, response, next) => {
    let { order } = request.body
    order = {...order, 
        customerId: mongoose.Types.ObjectId(order.customerId),
        bookId: mongoose.Types.ObjectId(order.bookId)
    }
    try {
        const newOrder = await Order.create(order);
        console.log("Order Added")
        response.status(200).json({ status: 200, message: "Order Added", payload: newOrder });
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}
//Get a Single Order By its Id
module.exports.getOrder = async (request, response, next) => {
    const { id } = request.params;
    try {
        const order = await Order.findById(id);
        if (order) {
            response.status(200).json({ status: 200, message: "Order Fetched", payload: order});
        } else {
            throw new Error("This Order Does Not Exsist on Our Database")
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
//Delete a Order By Its Id
// module.exports.deleteOrder = async (request, response, next) => {
//     const { id } = request.params;
//     try {
//         const result = await Order.findByIdAndDelete(id);
//         console.log(result);
//         response.status(200).json({ status: 200, message: "Successfully Deleted", payload: result });
//     } catch (error) {
//         const newError = new Error();
//         newError.message = "Order Not Found";
//         newError.status = 404;
//         next(newError);
//     }
// }