import express from "express";
import { createCars, getCar, getCars } from "../Controllers/CarController";

const Router = express.Router();

Router.route("/")
    .get(getCars)
    .post(createCars)

Router.route("/:carId")
    .get(getCar)

export default Router;