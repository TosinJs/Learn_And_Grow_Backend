const Product = require("../Models/Product");

module.exports.getProducts = async (req, res, next) => {
    const { query } = req
    try {
        const products = await Product.find({})
        if (!products.length) {
            throw new Error("No Products in this Database")
        }
        res.status(201).json({ status: 201, message: "Products Gotten", payload: products})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
        if (!product) {
            throw new Error("Product Not Found")
        }
        res.status(201).json({status: 201, message: "Product Found", payload: product})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
};

module.exports.createProduct = async (req, res, next) => {
    const { title, desc, img, categories, color, price } = req.body;
    try {
        const newProduct = await Product.create({
            title, desc, img, categories, color, price
        })
        res.status(201).json({ status: 200, message: "Product SUcessfully Created", payload: newProduct})
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.editProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedProduct) {
            throw new Error("Product Not Found")
        }
        res.status(201).json({ status: 200, message: "Successfully Updated", payload: updatedProduct })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Product.findByIdAndDelete(id)
        if (!result) {
            throw new Error("Product Not Found")
        }
        res.status(201).json({ status: 201, message: "Sucessfully Deleted", payload: result })
    } catch (error) {
        const newError = new Error();
        newError.message= (error.message);
        newError.status = 401;
        next(newError)
    }
}