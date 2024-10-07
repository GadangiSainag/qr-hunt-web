import { Request, Response } from "express";
// import { Team } from '../models/Team';
import { db } from "../config/db";
// Register a new team
export const validateScan = async (req: Request, res: Response) => {
  try {
    const teamDoc = await db.collection("questions");
    const { hash, id } = req.body;

    const questionRef = db.collection("questions").doc(`${id}`);
    const doc = await questionRef.get();

    if (doc.exists) {
      const allData = doc.data();

      console.log("Document data:", allData?.hint);
    } else {
      console.log("No such document!");
      res.json( doc.data());
    }

    res.status(201);
  } catch (error) {
    res.status(500).json({ message: "Error registering team", error });
  }
};


