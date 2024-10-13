import { Router } from 'express';
import { login , addQuestions, registerTeam} from '../controllers/adminControllers';

const router = Router();

// /api/admin/
router.post('/login', login);
router.post('/questions/add', addQuestions)
router.post('/team', registerTeam)

export default router;