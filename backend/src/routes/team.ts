import { Router } from 'express';
import { authTeam, testCommunication } from '../controllers/teamColtrollers';

const router = Router();

// /api/team/
router.post('/login', authTeam);
router.post('/test', testCommunication)
export default router;