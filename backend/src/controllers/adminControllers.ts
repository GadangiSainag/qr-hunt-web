import { Request, response, Response } from "express";
// import { Team } from '../models/Team';
import { db } from "../config/db";
import createSHA256Hash from "../utils/createHash"; 
import {  Question, TeamAuthInput, TeamData } from "../interfaces/types";
import { hash } from "crypto";

export const login = async (req: Request, res: Response) => {
  try {
    // retrive fields from request
    console.log(req.headers.authorization)
    const { userName, password } = req.body;
    

    const details = db.collection("admin").doc(`${userName}`);
    const doc = await details.get();

    if (!doc.exists) {
      //  if admin doesnot exists
      console.log("No such document!");
      res.json({no : "entry buddy"}).status(404);
    } else {
      // if  admin exists
      const allData = doc.data();

      console.log("from db", allData?.password);

      // wrong password
      if (allData?.password != password) {
        console.log("wrong password");
        
        res.json({ mssg: "wrong" }).status(401);
      } else {
        // correct password
        res.status(200).json({ mssg: "correct, get in this page!!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};


export const addQuestions = async (req: Request, res: Response) => {
  try {
    const { questions } = req.body;

    const questionsRef = db.collection("questions");
    async function storeQuestions(questions: Question[]) {
      for (const element of questions) {
        try {
          const questionData = {
            questionText: element.questionText,
            hint: element.hint,
            hash: createSHA256Hash(element.id, process.env.HASH_SALT),
          };

          await questionsRef.doc(`${element.id}`).set(questionData);
        } catch (error) {
          // Handle the error appropriately
          console.error("Error storing question:", error);
        }
      }
    }
    storeQuestions(questions);
    res.status(200).send({ msg: "good" });
  } catch {
    console.log("error");
    res.status(400);
  }
};

export const registerTeam = async(req:Request<{}, TeamAuthInput>, res:Response) =>{
  try{
    const {teamId, teamName, questionSet, huntId } = req.body;
    const teamsRef =db.collection("teams");
    async function registerTeam(data:TeamAuthInput) {
 
        try {
          const teamData = {
            teamName: data.teamName,
            questionSet: data.questionSet,
            hash: createSHA256Hash(teamName, process.env.HASH_SALT),
            huntId: data.huntId,
          };

          await teamsRef.doc(`${teamId}`).set(teamData);
          console.log("team registered")
          //  send teamhash and id as response
          res.status(200).json({teamId : teamId, teamHash: teamData.hash})
        } catch (error) {
          // Handle the error appropriately
          console.error("Error storing question:", error);

        }
      
    }
    registerTeam({
      teamId: teamId, teamName: teamName, questionSet: questionSet, huntId: huntId,
      
    });

  }catch (error) {
    // Handle the error appropriately
    console.error("Error storing question:", error);
    res.status(400);
  }

}