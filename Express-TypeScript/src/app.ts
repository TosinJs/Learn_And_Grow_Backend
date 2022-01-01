import express from "express";

const app = express()

app.get("/", (req, res, next) => {
    return res.status(200).send("Route Working")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App Listening on Port ${PORT}`))