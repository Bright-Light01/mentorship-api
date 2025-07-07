import { Router } from 'express';
import { register, login, profileController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middlewares'

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, profileController);

console.log('profile route hit');

export default router;