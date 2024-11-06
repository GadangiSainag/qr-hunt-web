import { Request, response, Response } from "express";

import { db } from "../config/db";
import { TeamData } from "../interfaces/types";
import { generateAccessToken, generateRefreshToken } from "./tokenControllers";
import { IAuthenticatedRequest } from "../middlewares/authMiddleware";
import { firestore } from "firebase-admin";
interface IQuestionProgress {
  id: string;
  text: string;
  difficulty: string;
  status: string;
}
export const authTeam = async (req: Request, res: Response) => {
  try {
    // admin shows a custom qr which contains a team specific hash, question set and which game they belong to.
    // read hash and if its present in admin assigned hashes from db, allow player else no entry.

    // retrive fields from request
    const {
      teamId,
      hash,
      location,
    }: {
      teamId: string;
      hash: string;
      location: { latitude: number; longitude: number };
    } = req.body;

    const teamDetails = db.collection("allTeams").doc(teamId);

    const teamDoc = await teamDetails.get();

    if (!teamDoc.exists) {
      //  if team doesnot exists
      console.log(
        "Team not registered, if already registered, please contact admin"
      );
      res.set("Cache-Control", "no-store");
      res.status(404).json({ message: "INVALID CREDENTIALS" });
    } else {
      // if  team exists
      const allData = teamDoc.data();

      // wrong hash
      if (allData?.hash != hash) {
        console.log("Please scan qr that is given by admin.");
        res.status(400).json({ mssg: "INCORRECT PASSWORD" });
      } else {
        // correct hash ------------

        //  send them a token to identify their team and question data
        const accessToken = generateAccessToken({
          id: teamDoc.id,
          role: "player",
        });
        const refreshToken = generateRefreshToken({
          id: teamDoc.id,
          role: "player",
        });
        const teamProgressRef = db.collection("gameProgress").doc(teamId);
        const geoPoint = new firestore.GeoPoint(
          location.latitude,
          location.longitude
        );

        await teamProgressRef.update({
          lastSeenAt: geoPoint,
        });

        // Set refresh token as an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        // Send the access token in the response
        res.status(200).json({ accessToken: accessToken });

        //
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging team", error });
  }
};

export const validateAnswer = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const {
      questionId,
      hash,
      location,
    }: {
      questionId: string;
      hash: string;
      location: { latitude: number; longitude: number };
    } = req.body;
    const user = req.user;

    const questionsRef = db.collection("allQuestions").doc(questionId);

    const teamProgressRef = db
      .collection("gameProgress")
      .doc(user?.id as string);
    const questionDoc = await questionsRef.get();
    const progressDoc = await teamProgressRef.get();

    if (!questionDoc.exists || !progressDoc.exists) {
      //  if question doesnot exists
      res.status(404).json({ message: "Please check login status." });
    } else {
      //  Question exists
      const questionData = questionDoc.data();
      // Wrong answer
      if (questionData?.hash != hash) {
        res.status(400).json({ message: "Wrong Answer! Think again." });
      } else {
        // Correct answer

        // Get the current questions array
        const questionSet: IQuestionProgress[] = progressDoc.get("questionSet");
        const solvedQuestions: number = progressDoc.get(
          "numberOfSolvedQuestions"
        );
        // Find the question to update
        const questionIndex = questionSet.findIndex(
          (particularQuestion: IQuestionProgress) =>
            particularQuestion.id === questionId
        );
        if (questionIndex === -1) {
          throw new Error(`Question with id ${questionId} not found`);
        }

        // Update the specific field within the question object
        questionSet[questionIndex] = {
          ...questionSet[questionIndex],
          status: "SOLVED",
        };

        const geoPoint = new firestore.GeoPoint(
          location.latitude,
          location.longitude
        );

        // Update the document with the modified questions array
        await teamProgressRef.update({
          lastSeenAt: geoPoint,
          numberOfSolvedQuestions: solvedQuestions + 1,
          questionSet,
        });
        res.status(200).json({ message: "CORRECT ANSWER" });
      }
    }
  } catch (error){
    console.log(error);

    res.status(500).json({ message: "Error with Qr." });
  }
};

export const updateLocation = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const {
      location,
    }: { location: { latitude: number; longitude: number } } = req.body;
    const user = req.user;

    const teamProgressRef = db
      .collection("gameProgress")
      .doc(user?.id as string);

    const progressDoc = await teamProgressRef.get();
    if (!progressDoc.exists) {
      res.status(404).json({ message: "Please check login status." });
    } else {
      const geoPoint = new firestore.GeoPoint(
        location.latitude,
        location.longitude
      );

      // Update the document with the modified questions array
      await teamProgressRef.update({
        lastSeenAt: geoPoint,
      });
      res.status(200).json({ message: "success" });
    }
  } catch {
    res.status(500).json({ message: "Error with Location" });
  }
};
