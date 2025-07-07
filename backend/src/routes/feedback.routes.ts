import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { submitFeedback, getMentorFeedback } from "../controllers/feedback.controller";

const router = Router();

//Mentee submit feedback
router.post('/', authenticate, submitFeedback);

//Get Feedbacks for a mentor
router.get('/mentorId', authenticate, getMentorFeedback);

export default router;