const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./db/index");
const customerRouter = require("./routes/CustomerRouter");

//Setup Express and DB
connectDB();
const app = express();

//Use Necessary Middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/customers", customerRouter);

//Error Handler Function
app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    console.log(status, message);
    response.status(status).json({ status, message })
})

app.listen(5500, () => console.log("Server Successfully Started"));