import express from 'express';
import carController from '../controllers/car';
import { verifyToken }  from '../middlewares/jwt';

const router = express.Router();

router.get('/', carController.getAll);
router.get('/:id', [verifyToken],carController.getById);
router.post('/', [ verifyToken ], carController.createCar);
router.put('/:id', [ verifyToken ], carController.updateCar);
router.delete('/:id', [ verifyToken ], carController.deleteCar);

export default router;