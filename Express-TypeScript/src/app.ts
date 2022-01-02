import express, { Request, Response } from "express";

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to My Server, Please Read the docs and use the appropriate endpoints")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`APp Listening on Port ${PORT}`))
