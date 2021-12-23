const Cart = require("../Models/Cart");

module.exports.getCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find({})
        if (!carts.length) {
            throw new Error("No Carts in this Database")
        }
        res.status(201).json({ status: 201, message: "Carts Gotten", payload: carts})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.getCart = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            throw new Error("Cart Not Found")
        }
        res.status(201).json({status: 201, message: "Cart Found", payload: cart})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
};

module.exports.createCart = async (req, res, next) => {
    try {
        const newCart = await Cart.create(req.body)
        res.status(201).json({ status: 200, message: "Cart SUcessfully Created", payload: newCart})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.editCart = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const updatedCart = await Cart.findOneAndUpdate({ userId }, req.body, { new: true })
        if (!updatedCart) {
            throw new Error("Cart Not Found")
        }
        res.status(201).json({ status: 200, message: "Successfully Updated", payload: updatedCart })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.deleteCart = async (req, res, next) => {
    const { id: userId } = req.params;
    try {
        const result = await Cart.findOneAndDelete({ userId })
        if (!result) {
            throw new Error("Cart Not Found")
        }
        res.status(201).json({ status: 201, message: "Sucessfully Deleted", payload: result })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}