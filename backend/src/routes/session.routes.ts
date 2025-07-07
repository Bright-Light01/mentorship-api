import { Router } from 'express';
import { authenticate  } from '../middlewares/auth.middlewares';
import { createSession, getMenteeSessions, getMentorSessions, submitFeedback } from '../controllers/session.controller';

const router = Router();

router.post('/', createSession);
router.get('/mentor', getMentorSessions);
router.get('/mentee', getMenteeSessions);
router.post('/feedback/:id', submitFeedback);
export default router;