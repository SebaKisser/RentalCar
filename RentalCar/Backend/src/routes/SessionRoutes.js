import SessionControllers from '../controllers/SessionControllers.js';
import express from 'express';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

/*---------------------RUTAS PUBLICAS------------------------------*/
router.post('/', SessionControllers.login);

router.delete('/', SessionControllers.logout);
/*-----------------------------------------------------------------*/

/*----------------------RUTAS PROTEGIDAS---------------------------*/
router.get('/me', authenticate, SessionControllers.getUserSession);

router.get('/', authenticate, SessionControllers.session);
/*-----------------------------------------------------------------*/

export default router;