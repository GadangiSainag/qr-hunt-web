import { NextFunction, Router } from "express";
import {
  login,
  addQuestions,
  registerTeam,
} from "../controllers/adminControllers";
import { authenticateToken } from "../middlewares/authMiddleware";
import { refreshToken } from "../controllers/tokenControllers";

const router = Router();

// /api/admin/

// public routes
router.post("/refresh-token", refreshToken);


export default router;
