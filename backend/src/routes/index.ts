import { Router } from 'express';
import qrRoutes from './qrRoutes';
import admin from './admin'
import team from './team'
import token from './token'
import game from './game'

import { authenticateToken } from '../middlewares/authMiddleware';
const router = Router();

// Route definitions
// /api
router.use('/validateScan', qrRoutes);


router.use('/game', game);
router.use('/admin', admin);
router.use('/token', token);
router.use('/team', team);

export default router;
