import { Router  } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { requestSession, respondToRequest } from "../controllers/request.controller";


const router = Router();

//mentee sends a a session request
router.post('/', authenticate, requestSession);

//mentor responds to a seesion request
router.put('/:id', authenticate, respondToRequest);

export default router;