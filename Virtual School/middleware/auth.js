const jwt = require("jsonwebtoken");
require('dotenv').config();
const { SECRET } = process.env; 

module.exports = (request, response, next) => {
    //Get Token From Header
    const token = request.header("x-auth-token")
    if (!token) {
        return response.status(401).json({
            statusCode: 401,
            message: "No Token, Authorization Denied"
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET)
        request.user = decoded.user
    } catch (error) {
        response.status(401).json({
            statusCode: 401,
            message: "Invalid Token"
        })
    }
}