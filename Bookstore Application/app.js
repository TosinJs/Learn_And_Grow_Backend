/**
 * Import the necessary files
 */
const express = require("express");
require("dotenv").config();
const { PORT } = process.env;
const connectDB = require("./db/index");
const bookRouter = require("./routes/BookRouter");
const authRouter = require("./routes/AuthRouter");
/**
 * Setting up the express server and MongoDB
 */
const app = express();
const port = process.env.PORT || PORT;
connectDB();
/**
 * Setting up the required middleware
 */
app.use(express.json({ extended: false }));
/**
 * Setting up the routes
 */
app.use("/books", bookRouter);
app.use("/auth", authRouter);

/**
 * Seeders
 */
// const { seedAdmin } = require("./seeders/admin");
// seedAdmin()
/**
 * Error Handler Function
 */
app.use((error, request, response, next) => {
    const { status = 500, message } = error
    console.log(message, status)
    response.status(status).json({ status, message }) 
})
/**
 * Listen on the specified Port
 */
app.listen(port);