const mongoose = require("mongoose");
const Customer = require("../model/Customer");

//Get All the Customers from the Database
module.exports.getCustomers = async (request, response, next) => {
    try {
        const customers = await Customer.find();
        if (customers.length > 0) {
            response.status(200).json({ status: 200, message: "Customers Fetched", payload: customers });
        } else {
            throw new Error("No Customer on Our Database");
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
// Create a new Customer and add it to the database
module.exports.createCustomer = async (request, response, next) => {
    const { customer } = request.body
    try {
        const newCustomer = await Customer.create(customer);
        console.log("Customer Added")
        response.status(200).json({ status: 200, message: "Customer Added", payload: newCustomer });
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}
//Get a Single Customer By its Id
module.exports.getCustomer = async (request, response, next) => {
    const { id } = request.params;
    try {
        const customer = await Customer.findById(id);
        if (customer) {
            response.status(200).json({ status: 200, message: "Customer Fetched", payload: customer});
        } else {
            throw new Error("This Customer Does Not Exsist on Our Database")
        }
    } catch (error) {
        const newError = new Error();
        newError.message = error.message;
        newError.status = 404;
        next(newError);
    }
}
//Delete a Customer By Its Id
module.exports.deleteCustomer = async (request, response, next) => {
    const { id } = request.params;
    try {
        const result = await Customer.findByIdAndDelete(id);
        console.log(result);
        response.status(200).json({ status: 200, message: "Successfully Deleted", payload: result });
    } catch (error) {
        const newError = new Error();
        newError.message = "Customer Not Found";
        newError.status = 404;
        next(newError);
    }
}