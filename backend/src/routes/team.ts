import { Router } from 'express';
import { authTeam,  updateLocation,  validateAnswer } from '../controllers/teamColtrollers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// /api/team/
router.post('/login', authTeam);

router.use(authenticateToken) 
router.post('/validate', validateAnswer)
router.post('/update-location', updateLocation)
// private routes

export default router;