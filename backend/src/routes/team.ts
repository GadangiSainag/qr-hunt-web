import { Router } from 'express';
import { authTeam,  validateAnswer } from '../controllers/teamColtrollers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// /api/team/
router.post('/login', authTeam);

router.use(authenticateToken) 
router.post('/validate', validateAnswer)
// private routes

export default router;