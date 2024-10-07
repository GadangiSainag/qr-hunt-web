import { Request, Response } from "express";
// import { Team } from '../models/Team';
import { db } from "../config/db";

export const login = async (req: Request, res: Response) => {
  try {
    // retrive fields from request
    const { userName, password } = req.body;


    const details = db.collection("admin").doc(`${userName}`);
    const doc = await details.get();

    if (!doc.exists) {
      //  if admin doesnot exists
      console.log("No such document!");
      res.status(404);
    } else {
      // if  admin exists
      const allData = doc.data();

      console.log("from db", allData?.password);

      // wrong password
      if (allData?.password != password) {
        console.log("wrong password");
        res.status(401);
        res.json({ mssg: "wrong" });

      } else {
        // correct password
        res.status(200);
        res.json({ mssg: "correct, get inot this page!!" })
      }
    }

  } catch (error) {
    res.status(500).json({ message: "Error registering team", error });
  }
};
