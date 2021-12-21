const express = require("express");
const mongoose = require("mongoose");
const logger = require("logger");
const app = express();
const connectDB = require("./db/index");

connectDB()

//Using MiddleWare
app.use(logger);
app




app.listen(3000, () => {
    console.log("Listening on the Server")
});