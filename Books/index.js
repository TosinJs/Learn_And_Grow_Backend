const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectDB = require("./db/index");
const BookRouter = require("./routes/BooksRouter");

//Setup Express and DB
connectDB();
const app = express();

//Use Necessary Middleware
app.use(express.json({ extended: false }));

app.get("/", (request, response, next) => {
    response.send("Book is running");
})

//Routes
app.use("/books", BookRouter);

//Error Handler Function
app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    console.log(status, message);
    response.status(status).json({ status, message })
})

app.listen(3000, () => console.log("Server Successfully Started"));