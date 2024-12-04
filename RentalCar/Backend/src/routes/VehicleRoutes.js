import express from 'express';
import VehicleControllers from '../controllers/VehicleControllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post('/', authenticate, VehicleControllers.create);

//FIND ALL
router.get('/', authenticate, VehicleControllers.findAll);

//FIND BY ID
router.get('/:id', authenticate, VehicleControllers.findById);

//UPDATE
router.put('/:id', authenticate, VehicleControllers.updateById);

//DELETE
router.delete("/:id", authenticate, VehicleControllers.deleteById);

export default router;