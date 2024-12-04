import { Router } from "express";
import { fetchBatchLeaderboard, fetchGlobalLeaderboard, testController } from "../controllers/leaderboardControllers";


const router = Router();
//  api/leaderboard/


router.get("/global", fetchGlobalLeaderboard);
router.get("/:gameId", fetchBatchLeaderboard);
router.get("/test/:gameId", testController);
// router.post("/global", );

export default router;
