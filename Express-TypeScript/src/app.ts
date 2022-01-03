import express, { NextFunction, Request, Response } from "express";
import connectDB from "./db";
import CarRouter from "./Routes/CarRouter";

interface Error {
    status?: number,
    message?: string
}

const app = express();
connectDB()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to My Server, Please Read the docs and use the appropriate endpoints")
})

app.use("/api/cars", CarRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";
    res.status(500).json({status: err.status, payload: err.message})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App Listening on Port ${PORT}`))
