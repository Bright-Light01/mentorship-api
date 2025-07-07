import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middlewares';
import { getMessages, sendMessage } from '../controllers/message.controllers';

const router = Router();

//send a message
router.post('/', authenticate, sendMessage);

//Get messasges for logged-in user
router.get('/', authenticate, getMessages);

export default router;