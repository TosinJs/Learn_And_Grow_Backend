/**
 * 1. Create a connection for mongoDB
 * 2. Connect MongoDB to mongoDB Atlas
 */

const mongoose = require('mongoose');
require('dotenv').config();
const { dbURI } = process.env;

//Creating the mongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connected to the database")
    } catch (error) {
        console.log(error)
        //Exit the process
        processs.exit(1)
    }
}

module.exports = connectDB;