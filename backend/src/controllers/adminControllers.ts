import { Request, response, Response } from "express";

import { db } from "../config/db";
import createSHA256Hash from "../utils/createHash";
import { IQuestion, ITeamDetails, TeamData } from "../interfaces/types";
import { messaging } from "firebase-admin";

import jwt, { PrivateKey } from "jsonwebtoken";
import { Encoding } from "crypto";
import { generateAccessToken, generateRefreshToken } from "./tokenControllers";
import { stringToStringArray } from "../utils/converter";

export interface IUser {
  id: string;
  role: "admin" | "player";
  // refreshToken?: string;
}

export interface JWTPayload {
  id: string;
  role: string;
}

export const login = async (req: Request, res: Response) => {
  try {
    // retrive fields from request
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(403).json({ message: "Please fill all required fields!" });
      return;
    }
    const snapshot = await db.collection("admin")
      .where("admin", '==', userName)
      .get();
//           admin(field) : value
    if (!snapshot.empty) {
      // doc with admin name found, usually gives an array (use forEach)
      snapshot.forEach(doc => {
      // admin doc exists
      const allData = doc.data();

      if (allData.password != password) {
        // wrong password
        res.status(400).json({ message: "INCORRECT PASSWORD" });
      } else {
        // correct password, allow admin to dashboard
        const accessToken = generateAccessToken({
          id: allData.id,
          role: allData.role,
        });
        const refreshToken = generateRefreshToken({
          id: allData.id,
          role: allData.role,
        });

        console.log("token created");
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        res.status(200).json({ accessToken: accessToken });
      }
      });
    } else {
      // admin name not matched
      console.log('No matching document found.');
    }

  } catch (error) {
    res.status(500).json({ message: "Error registering admin, ", error });
  }
};

export const addQuestions = async (req: Request, res: Response) => {
  try {
    const { questions } = req.body;
    if (!questions) {
      res.status(403).json({ message: "please provide correct information." });
      return;
    }
    const questionsRef = db.collection("allQuestions");

    async function storeQuestions(questions: IQuestion[]) {
      for (const element of questions) {
        try {
          const questionData = {
            questionText: element.questionText,
            hint: element.hint,
            difficulty: element.difficulty,
            hash: createSHA256Hash(element.custonId, process.env.HASH_SALT),
          };

          // await questionsRef.doc(`${element.custonId}`).set(questionData);
          // creating a doc with auto generated id
          const res = await questionsRef.add(questionData);
        } catch (error) {
          // Handle the error appropriately
          console.error("Error storing question:", error);
        }
      }
    }
    storeQuestions(questions);
    res.status(200).json({ message: "Questions added Successfully." });
  } catch {
    console.log("error");
    res.status(400);
  }
};

export const registerTeam = async (
  req: Request<{}, ITeamDetails>,
  res: Response,
  next: unknown
) => {
  try {
    const { players, teamName, questions, huntId }: ITeamDetails = req.body;
    const { user } = req.body;
    console.log(user);
    if (!(teamName && questions && huntId && players)) {
      res
        .status(403)
        .json({ message: "Please provide all required information." });
      return;
    }

    const teamsRef = db.collection("allTeams");

    async function registerFunc(data: ITeamDetails) {
      try {
        const teamData = {
          teamName: data.teamName,
          players: stringToStringArray(data.players, true),
          hash: createSHA256Hash(teamName, process.env.HASH_SALT),
          huntId: data.huntId,
          startTime: null,
          registeredTime: Date.now(),
          lastSeenAt: null,
          gameStatus: "ready",
          endTime: null,
          duration: 0,
        };

        const thisTeamRef = await teamsRef.add(teamData);

        const generatedTeamId = thisTeamRef.id;

        // create document for game progress collection.
        const gameProgressDocRef = db
          .collection("gameProgress")
          .doc(generatedTeamId);
        // convert string as string array of question custom id
        const questionSet = stringToStringArray(questions, false);

        const questionSetData = questionSet.map((eachQuestion: string) => ({
          questionId: eachQuestion,
          solved: false,
        }));

        const teamProgressData = {
          numberOfQuestions: questionSet.length,
          numberOfSolvedQuestions: 0,
          questionSet: questionSetData,
        };

        await gameProgressDocRef.set(teamProgressData);
        //  send teamhash and id as response for team qr generation
        res
          .status(200)
          .json({ teamId: generatedTeamId, teamHash: teamData.hash });
      } catch (error) {
        // Handle the error appropriately
        console.error("Error storing question:", error);
      }
    }
    // call the register func
    registerFunc({
      teamName: teamName,
      players: players,
      huntId: huntId,
      questions: questions,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error storing question:", error);
    res.status(400).json({ message: "error creating team" });
  }
};
