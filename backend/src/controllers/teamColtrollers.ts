import { Request, response, Response } from "express";

import { db } from "../config/db";
import {  TeamData } from "../interfaces/types";

export const authTeam = async (req: Request, res: Response) => {
  try {
    // admin shows a custom qr which contains a team specific hash, question set and which game they belong to.
    // read hash and if its present in admin assigned hashes from db, allow player else no entry.

    // retrive fields from request
    const { teamId, hash } = req.body;

    const teamDetails = db.collection("allTeams").doc(teamId);

    const teamDoc = await teamDetails.get();

    if (!teamDoc.exists) {
      //  if team doesnot exists
      console.log(
        "Team not registered, if already registered, please contact admin"
      );
      res.set('Cache-Control', 'no-store');
      res.status(404).json({ no: 'entry buddy' });
    } else {
      // if  team exists
      const allData = teamDoc.data();

      // wrong hash
      if (allData?.hash != hash) {
        console.log("Please scan qr that is given by admin.");
        res.json({ mssg: "INCORRECT PASSWORD" }).status(400);
      } else {
        // correct hash ------------

  //  send them a token to identify their team and question data
        
        res.status(200).json({ mssg: "Logged In." });
        //
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging team", error });
  }
};
