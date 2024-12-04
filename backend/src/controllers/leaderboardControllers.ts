import { ErrorRequestHandler, Request, Response } from "express";
import { db } from "../config/db";
import { getBatchLeaderboard, getGlobalLeaderboard } from "../utils/leaderboard";

export const fetchBatchLeaderboard = async (req: Request, res: Response) => {
  const { gameId } = req.params;
console.log("got hit")
  if (!gameId) {
    res.status(400).json({ error: "Batch ID is required." });
  }

  try {
    const leaderboard = await getBatchLeaderboard(gameId);
    console.log("sent ")
    res.status(200).json({ leaderboard });
  } catch (error) {
    res.status(404).json({ message: 'Batch not found' });
  }
};


export const testController = async (req: Request, res: Response) => {
  const { gameId } = req.params;

  try {
   
    res.status(200).json({ message: `hello ${gameId}` });
  } catch (error) {
    res.status(500).json({ error });
  }
};


export const fetchGlobalLeaderboard = async (req: Request, res: Response) => {
console.log("got hit to me")
  try {
    const leaderboard = await getGlobalLeaderboard();
    console.log("sent ")
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.log("come on broo")
    res.status(404).json({ message: 'Bro not found' });
  }
};
