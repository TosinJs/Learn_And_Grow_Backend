const Order = require("../Models/Order");

module.exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        if (!orders.length) {
            throw new Error("No Orders in this Database")
        }
        res.status(201).json({ status: 201, message: "Orders Gotten", payload: orders})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.getOrder = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const order = await Order.find({ userId })
        if (!order.length) {
            throw new Error("Order Not Found")
        }
        res.status(201).json({status: 201, message: "Order Found", payload: order})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
};

module.exports.createOrder = async (req, res, next) => {
    try {
        const newOrder = await Order.create(req.body)
        res.status(201).json({ status: 200, message: "Order SUcessfully Created", payload: newOrder})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.editOrder = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const updatedOrder = await Order.findOneAndUpdate({ userId }, req.body, { new: true })
        if (!updatedOrder) {
            throw new Error("Order Not Found")
        }
        res.status(201).json({ status: 200, message: "Successfully Updated", payload: updatedOrder })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.deleteOrder = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const result = await Order.findOneAndDelete({ userId })
        if (!result) {
            throw new Error("Order Not Found")
        }
        res.status(201).json({ status: 201, message: "Sucessfully Deleted", payload: result })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}