import { Router } from "express";
import { authenticate } from '../middlewares/auth.middlewares';
import { getProfile } from '../controllers/profile.controllers'

const router = Router();

router.get('/profile', authenticate, getProfile);

export default router;