import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const DBURI = process.env.DBURI as string;

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI, {});
        console.log("connected to the database")
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;