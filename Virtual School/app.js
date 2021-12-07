const express = require('express');
const connectDB = require('./db/index');
require('dotenv').config();
const { PORT } = process.env
const userRouter = require('./routes/userRouter');

//connect to the Database
connectDB();

//initialize express
const app = express();

//Initializing the required Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', (request, response, next) => {
    response.json('Welcome to School')
});
app.use('/api/auth', userRouter)

//Listen on the port
const port = process.env.port || PORT;
app.listen(port, () => console.log(`App running on ${port}`))

