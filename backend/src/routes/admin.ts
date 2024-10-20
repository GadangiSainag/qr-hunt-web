import { NextFunction, Router } from "express";
import {
  login,
  addQuestions,
  registerTeam,
} from "../controllers/adminControllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// /api/admin/

// public routes
router.post("/login", login);


// request goes through this middleware then pased to correct route.

router.use(authenticateToken) 
// private routes

router.post("/questions/add", addQuestions);
router.post("/team", registerTeam);

export default router;
