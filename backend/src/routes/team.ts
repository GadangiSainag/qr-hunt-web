import { Router } from 'express';
import { authTeam } from '../controllers/teamColtrollers';

const router = Router();

// /api/team/
router.post('/login', authTeam);

export default router;