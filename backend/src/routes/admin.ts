import { Router } from 'express';
import { login , addQuestions} from '../controllers/adminController';

const router = Router();

// admin/
router.post('/login', login);
router.post('/addQuestions', addQuestions)

export default router;