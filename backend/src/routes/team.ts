import { Router } from 'express';
import { authTeam, testCommunication } from '../controllers/teamColtrollers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// /api/team/
router.post('/login', authTeam);
router.post('/test', testCommunication)

router.use(authenticateToken) 
// private routes

export default router;