import express from "express";
import fetch from "node-fetch";
import Router from "./routes/OrdersRouter.js";

import connectDB  from "./db/index.js";

//Setup Express and DB
connectDB();
const app = express();

//Use Necessary Middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/orders", Router);

//Error Handler Function
app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    console.log(status, message);
    response.status(status).json({ status, message })
})

app.listen(7777, () => console.log("Server Successfully Started"));