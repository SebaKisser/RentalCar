import express from 'express';
import UserControllers from '../controllers/UserControllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//CREATE
router.post('/', UserControllers.create);

//FIND ALL
router.get('/' , authenticate, UserControllers.findAll);

//FIND BY ID
router.get('/:id', authenticate, UserControllers.findById);

//UPDATE
router.put('/:id', authenticate, UserControllers.updateById);

//DELETE
router.delete("/:id", authenticate, UserControllers.deleteById);

export default router;