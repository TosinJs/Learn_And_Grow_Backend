const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_KEY } = process.env;

const verifyToken = (req, res, next) => {
    let token = req.header("authorization")
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "No tokens lol",
        })
    }
    try {
        token = token.split(" ")[1]
        const decodedToken = jwt.verify(token, JWT_KEY)
        req.user = decodedToken.user
        next()
    } catch (error) {
        const newError = new Error()
        newError.message = error.message,
        newError.status = 401
        next(error)
    }
}

const verifyOwner = (req, res, next) => {
    const { user } = req;
    const { id, isAdmin  } = user;
    if (id === req.params.id || isAdmin === true) {
        return next()
    }
    return res.status(501).json({
        status: 501,
        message: "No Access",
    })
}

const verifyAdmin = (req, res, next) => {
    const { user } = req;
    const { isAdmin } = user;
    if (isAdmin === false || !isAdmin) {
        return res.status(403).json({
            status: 403,
            message: "No Access",
        })
    }
    next()
}

module.exports = { verifyToken, verifyAdmin, verifyOwner }