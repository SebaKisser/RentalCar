import express from 'express';
import AlquilerControllers from '../controllers/AlquilerControllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

router.post('/', authenticate, AlquilerControllers.alquilar);

router.get('/',  authenticate, AlquilerControllers.getAlquileres);

router.delete('/:id',  authenticate, AlquilerControllers.deleteAlquilerById);

export default router;