const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/index");
const UserRouter = require("./routes/userRouter");
const AuthRouter = require("./routes/authRouter");

connectDB();
const app = express();

//Using MiddleWare
app.use(express.json({ extended: true }));
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on the Server")
});

app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    console.log(status, message);
    response.status(status).json({ status, message })
})