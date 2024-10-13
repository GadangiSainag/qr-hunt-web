import { Router } from 'express';
import { validateScan } from '../controllers/scanColtroller';

const router = Router();
//  api/validateScan
router.post('/', validateScan);


export default router;