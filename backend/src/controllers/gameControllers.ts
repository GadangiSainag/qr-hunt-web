import { Request, response, Response } from "express";

import { db } from "../config/db";
import { TeamData } from "../interfaces/types";
import { generateAccessToken, generateRefreshToken } from "./tokenControllers";
import { IAuthenticatedRequest } from "../middlewares/authMiddleware";

export const startGame = async (req: IAuthenticatedRequest, res: Response) => {
  const user = req.user;

  const { startAt } = req.body;
  if (user) {
    const team = db.collection("allTeams").doc(user.id);
    try {
      const teamSnapshot = await team.get();
      if (!teamSnapshot.exists) {
        res.status(404).json({ message: "Document not found" });
        return;
      }
      const docData = teamSnapshot.data();
      const fieldValue = docData ? docData["startTime"] : null;
      if (fieldValue === null) {
        await team.update({
          ["startTime"]: startAt,
          gameStatus: "IN_GAME",
        });
        console.log("time updated")
        res.status(201).json({ message: "Time started successfully" });
    } else {
          console.log("time already exists")
        res.status(200).json({ message: "Back to game." });
      }
    } catch (error) {
      res.status(500).json({ message: "Error with user.", error });
    }
  }
};
