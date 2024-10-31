import { Request, response, Response } from "express";

import { db } from "../config/db";
import createSHA256Hash from "../utils/createHash";
import { IQuestion, ITeamDetails, TeamData } from "../interfaces/types";

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
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(403).json({ message: "Please fill all required fields!" });
      return;
    }

    const snapshot = await db
      .collection("admin")
      .where("admin", "==", userName)
      .get();

    // Check if the snapshot is not empty
    if (!snapshot.empty) {
      let isHandled = false;

      for (const doc of snapshot.docs) {
        const allData = doc.data();

        // Compare provided password with the stored password
        if (allData.password !== password) {
          // Wrong password, send error response
          res.status(400).json({ message: "INCORRECT PASSWORD" });
          isHandled = true;
          break;
        } else {
          // Correct password, generate access and refresh tokens
          const accessToken = generateAccessToken({
            id: doc.id,
            role: allData.role,
          });
          const refreshToken = generateRefreshToken({
            id: doc.id,
            role: allData.role,
          });

          // Set refresh token as an HTTP-only cookie
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          // Send the access token in the response
          res.status(200).json({ accessToken: accessToken });
          isHandled = true;
          break;
        }
      }

      if (!isHandled) {
        // No document processed (this should not occur if .empty is false)
        res.status(500).json({ message: "Error processing login" });
      }
    } else {
      // No admin name matched
      console.log("No matching document found.");
      res
        .status(404)
        .json({ message: "ADMIN NOT FOUND, Go register yourself in db" });
    }
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Error logging in admin" });
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
            customId: element.customId,
            questionText: element.questionText,
            hint: element.hint,
            difficulty: element.difficulty,
            hash: createSHA256Hash(element.customId, process.env.HASH_SALT),
          };

          // await questionsRef.doc(`${element.customId}`).set(questionData);
          // creating a doc with auto generated id
          const res = await questionsRef.add(questionData);
        } catch (error) {
          // Handle the error appropriately
          console.error("Error storing question: ", error);
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
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.body;

    if (!questionId) {
      res.status(403).json({ message: "please provide correct information." });
      return;
    }

    async function deleteDocument(collectionName: string, docId: string) {
      try {
        await db.collection(collectionName).doc(docId).delete();
        // console.log(`Document with ID ${docId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
    deleteDocument("allQuestions", questionId);
    res.status(200).json({ message: "Questions Deleted Successfully." });
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
          gameStatus: "READY",
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
        const questionsRef = db.collection("allQuestions");
        // Query to get documents where questionId field matches any of the ids in the array
        const querySnapshot = await questionsRef
          .where("customId", "in", questionSet)
          .get();
        // Extracting document data
        const allQuestionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().questionText,
          difficulty: doc.data().difficulty,
          status: "PENDING",
        }));
        const teamProgressData = {
          lastSeenAt: null,
          numberOfQuestions: allQuestionsData.length,
          numberOfSolvedQuestions: 0,
          questionSet: allQuestionsData,
        };
        await gameProgressDocRef.set(teamProgressData);
        //  send teamhash and id as response for rending team QR
        res.status(200).json({ id: generatedTeamId, password: teamData.hash });
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
