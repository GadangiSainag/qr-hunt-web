import { Router } from 'express';

import qrRoutes from './qrRoutes';
import admin from './admin'

const router = Router();

// Route definitions
// api/
router.use('/', qrRoutes);
router.use('/admin', admin);
export default router;
