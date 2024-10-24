import { Router } from "express";
import { startGame } from "../controllers/gameControllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();
//  api/game/
router.use(authenticateToken);

router.post("/start", startGame);

export default router;
