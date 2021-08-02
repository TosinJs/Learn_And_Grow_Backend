const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

module.exports.authenticateUser = (request, response, next) => {
    let { authorization } = request.headers
    if (!authorization) {
        const error =  new Error("No access Authroization is required")
        error.status = 401
        throw error
    }
    const token = authorization.split(" ")[1]
    if (!token) {
        const error =  new Error("Invalid Token")
        error.status = 401
        throw error
    }
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            throw err
        }
        if (!decodedToken) {
            const error =  new Error("Invalid Token")
            error.status = 401
            throw error
        }
        request.user = decodedToken
        next()
    })
}

module.exports.checkAdmin = (request, response, next) => {
    const { role } = request.user;
    if (role !== "admin") {
        const error =  new Error("No access Authroization is required")
        error.status = 401
        throw error
    }
    next()
}