import { Router } from 'express';

import qrRoutes from './qrRoutes';
import admin from './admin'

const router = Router();

// Route definitions

router.use('/', qrRoutes);
router.use('/admin/login', admin);
export default router;
