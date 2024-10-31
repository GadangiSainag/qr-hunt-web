import { NextFunction, Router } from "express";
import {
  login,
  addQuestions,
  registerTeam,
  deleteQuestion,
} from "../controllers/adminControllers";
import { authenticateToken } from "../middlewares/authMiddleware";
import { dummy } from "../controllers/testControllers";

const router = Router();

// /api/admin/

// public routes
router.post("/login", login);

// request goes through this middleware then pased to correct route.

router.use(authenticateToken);
// private routes

router.post("/dummy", dummy);
router.post("/questions/add", addQuestions);
router.post("/questions/delete", deleteQuestion);
router.post("/team", registerTeam);

export default router;
