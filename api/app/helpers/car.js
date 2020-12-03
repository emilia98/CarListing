import { Car } from '../db/models/index';

export const getCar = async (carId, res) => {
    let car = null;

    try {
        car = await Car.findByPk(carId);
    } catch(err) {
        console.warn(err);
        return res.status(500).json({
            errorMessage: 'An error occurred while trying to get a car'
        });
    }

    if (car == null) {
        res.status(404).json({
            errorMessage: 'Car not found!'
        });

        return null;
    };

    return car;
}