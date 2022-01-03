import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
    },
    yearOfProd: {
        type: Date,
    }
})

const Car = mongoose.model("Car", CarSchema);

export default Car;