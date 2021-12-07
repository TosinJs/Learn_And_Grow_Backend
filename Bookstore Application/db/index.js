/**
 * Setting up the MongoDb connection
 */

const mongoose = require('mongoose');
require("dotenv").config();
const { DBURI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Conected to the database.....")
    } catch (error) {
        console.log(error.message)
        /**
         * If failed to connect to the database, exit the function
         */
        process.exit(1)
    }
}

module.exports = connectDB;