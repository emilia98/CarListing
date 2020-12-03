import { Car } from '../db/models/index';
import { getCar } from '../helpers/car';

export default {
    getAll: async (req, res) => {
        let cars = [];

        try {
            cars = await Car.findAll();
        } catch(err) {
            console.warn(err);
            return res.status(500).json({
                message: 'An error occurred while getting all cars!'
            });
        }

        return res.status(200).json({
            cars: cars
        });
    },
    getById: async (req, res) => {
        let carId = req.params.id;
        let car = await getCar(carId, res);

        return res.status(200).json({
            car: car
        });
    },
    createCar: async (req, res) => {
        let { body } = req;

        let data = {};
        let errors = {};

        if (body?.brand && body.brand?.length > 0) {
            data.brand = body.brand;
        } else {
            errors.brand = 'Brand is required!'
        }

        if (body?.model && body.model?.length > 0) {
            data.model = body.model;
        } else {
            errors.model = 'Model is required!'
        }

        if (body?.year && body.year?.length > 0) {
            data.year = parseInt(body.year);
        } else {
            errors.year = 'Year is required!'
        }

        if (body?.price) {
            data.price = parseFloat(body.price);
        } else {
            errors.price = 'Price is required!'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors
            });
        }

        data.UserId = req.userId;

        let car = null;

        try {
            car = await Car.create(data);
        } catch(err) {
            console.warn(err);
            return res.status(500).json({
                errorMessage: 'An error occurred while trying to create a new car!'
            });
        }

        res.status(200).json({
            'successMessage': 'Successfully created a new car!',
            car: car
        })
    },
    updateCar: async (req, res) => {
        let carId = req.params.id;
        let car = await getCar(carId, res);

        let currentUserId = req.userId;
        let carUserId = car.UserId;

        if (currentUserId != carUserId) {
            return res.status(401).json({
                errorMessage: "Cannot update a car, which is not yours!"
            })
        }
        
        res.status(200).json({
            'message': 'update'
        })
    },
    deleteCar: async (req, res) => {
        let carId = req.params.id;
        let car = await getCar(carId, res);

        let currentUserId = req.userId;
        let carUserId = car.UserId;

        if (currentUserId != carUserId) {
            return res.status(401).json({
                errorMessage: 'Cannot delete a car, which is not yours!'
            });
        }
        

        console.log(req.userId, car.UserId)

        // console.log(car)


        
        res.status(200).json({
            'message': 'Successfully deleted car'
        })
    }
};