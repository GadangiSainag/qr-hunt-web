import { Request, Response } from "express";
// import { Team } from '../models/Team';
import { db } from "../config/db";

export const validateScan = async (req: Request, res: Response) => {
  try {
    // for validating questions only at present.
    const { hash, id } = req.body;

    const questionRef = db.collection("questions").doc(`${id}`);
    const doc = await questionRef.get();

    if (doc.exists) {
      const allData = doc.data();

      console.log("Document hint:", allData?.hint);
      if (allData?.hash === hash) {
        // correct qr scanned
        res.json({ key: "correct" }).status(200);
      } else {
        res.send({ key: "wrong" });
      }
     ;
    }

    
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
