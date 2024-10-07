import { Router } from 'express';
import { validateScan } from '../controllers/scanColtroller';

const router = Router();

// router.get('/', registerTeam);
router.post('/', validateScan);


export default router;