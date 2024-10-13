import { Router } from 'express';

import qrRoutes from './qrRoutes';
import admin from './admin'
import team from './team'
const router = Router();

// Route definitions
// /api/
router.use('/validateScan', qrRoutes);
router.use('/admin', admin);
router.use('/team', team);

export default router;
