import { Router } from 'express';
import { login, register, updateUser } from '../controllers/authController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();


router.post('/register', register);
router.post('/login', login);
router.patch('/update/:user_id', ensureAuthenticated, updateUser);

export default router;
