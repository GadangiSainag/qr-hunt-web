import { Request, response, Response } from "express";
// import { Team } from '../models/Team';
import { db } from "../config/db";
import createSHA256Hash from "../utils/createHash";
import { Question } from "../interfaces/types";

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
        res.json({ mssg: "correct, get in this page!!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering team", error });
  }
};
