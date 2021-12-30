const express = require("express");
const redis = require("redis");
const axios = require("axios");
const util = require("util");
const app = express();

const redisClient = redis.createClient()
redisClient.on("connect", () => console.log("Connected to redis"))
redisClient.on("error", () => console.log("Error Connecting to Redis"))
redisClient.set = util.promisify(redisClient.set)
redisClient.get = util.promisify(redisClient.get)

app.use(express.json())

app.post("/", async (req, res, next) => {
    const { key, value } = req.body
    const response = await redisClient.set(key, value)
    res.status(200).json(response)
})
app.get("/", async (req, res, next) => {
    const { key } = req.body;
    const value = await redisClient.get(key)
    res.status(200).json(value)
})
app.get("/posts/:id", async (req, res, next) => {
    const { id } = req.params;
    const cachedPost = await redisClient.get(`post-${id}`)
    if (cachedPost) {
        console.log("from cache")
        return res.status(200).json(JSON.parse(cachedPost))
    }
    const data =  await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = data.data
    await redisClient.set(`post-${id}`, JSON.stringify(post), "EX", 200)
    console.log("from fetch")
    res.status(200).json(post)
})


app.listen(3000, console.log("Listening on Port 3000"))