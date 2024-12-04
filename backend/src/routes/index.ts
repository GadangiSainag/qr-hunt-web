import { Router } from 'express';
import admin from './admin'
import team from './team'
import token from './token'
import game from './game'
import leaderboard from './leaderboard'

import { authenticateToken } from '../middlewares/authMiddleware';
const router = Router();

// Route definitions
// /api
router.use('/game', game);
router.use('/admin', admin);
router.use('/token', token);
router.use('/team', team);
router.use('/leaderboard', leaderboard)

export default router;
