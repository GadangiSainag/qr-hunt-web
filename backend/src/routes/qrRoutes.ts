import { Router } from 'express';
import { validateScan } from '../controllers/scanColtroller';

const router = Router();

router.post('/', validateScan);


export default router;