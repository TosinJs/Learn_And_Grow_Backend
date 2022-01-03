/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { createNewError } from "../errorCreator";
import Car from "../Models/CarModel";

interface car {
    name: string,
    model: string,
    yearOfProd?: Date
}

export const getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars: Array<car> = await Car.find()
        if (!cars.length) {
            const error = createNewError("No Cars in the Database", 401)
            throw(error)
        }
        res.status(201).json({status: 200, message: "Gotten", payload: cars})
    } catch (error: any) {
        const newError = createNewError(error.message, error.status || 401)
        next(newError)
    }
}
export const createCars = async (req: Request<{car: car}>, res: Response, next: NextFunction) => {
    const { car } = req.body
    try {
        const newCar: car = await Car.create(car)
        res.status(201).json({status: 200, message: "Created", payload: newCar})
    } catch (error: any) {
        const newError = createNewError(error.message, error.status || 401)
        next(newError)
    }
}

export const getCar = async (req: Request<{carId: string}>, res: Response, next: NextFunction) => {
    const { carId } = req.params
    try {
        const car: car = await Car.findById(carId)
        if (!car) {
            const error = createNewError("This Car Not in the Database", 401)
            throw(error)
        }
        res.status(201).json({status: 200, message: "Gotten", payload: car})
    } catch (error: any) {
        const newError = createNewError(error.message, error.status || 401)
        next(newError)
    }
}
