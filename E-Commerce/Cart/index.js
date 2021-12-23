const express = require("express");
const connectDB = require("./db/index");
const ProductRouter = require("./routes/cartRouter");

connectDB();
const app = express();

//Using MiddleWare
app.use(express.json({ extended: true }));
app.use("/api/cart", ProductRouter);

app.listen(process.env.PORT || 7000, () => {
    console.log("Listening on the Server")
});

app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    console.log(status, message);
    response.status(status).json({ status, message })
})