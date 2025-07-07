import { Router } from 'express';
import { authenticate, authorize  } from '../middlewares/auth.middlewares';
import  { getAllUsers, updateUserRole } from '../controllers/user.controllers';

const router = Router();

router.get('/users', authenticate, authorize('user'), getAllUsers);
router.put('/users/:id/role', authenticate, authorize('user'), updateUserRole);

export default router;