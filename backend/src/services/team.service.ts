import { firestore } from "firebase-admin";
import { db } from "../config/db";
import { ITeam, ILocation, IQuestionProgress, IGameProgress } from "../types/models";
import { ApiError } from "../types/response";
import { generateAccessToken, generateRefreshToken } from "../controllers/tokenControllers";

export class TeamService {
  private static instance: TeamService;
  private constructor() {}

  static getInstance(): TeamService {
    if (!TeamService.instance) {
      TeamService.instance = new TeamService();
    }
    return TeamService.instance;
  }

  async authenticateTeam(teamId: string, hash: string, location: ILocation) {
    const teamDetails = db.collection("allTeams").doc(teamId);
    const teamDoc = await teamDetails.get();

    if (!teamDoc.exists) {
      throw new ApiError("Team not registered, if already registered, please contact admin", 404);
    }

    const allData = teamDoc.data() as ITeam;
    if (allData?.hash !== hash) {
      throw new ApiError("Please scan qr that is given by admin.", 400);
    }

    const accessToken = generateAccessToken({
      id: teamDoc.id,
      role: "player",
    });

    const refreshToken = generateRefreshToken({
      id: teamDoc.id,
      role: "player",
    });

    await this.updateTeamLocation(teamId, location);

    return { accessToken, refreshToken };
  }

  async validateAnswer(teamId: string, questionId: string, hash: string, location: ILocation) {
    const questionsRef = db.collection("allQuestions").doc(questionId);
    const teamProgressRef = db.collection("gameProgress").doc(teamId);

    const [questionDoc, progressDoc] = await Promise.all([
      questionsRef.get(),
      teamProgressRef.get()
    ]);

    if (!questionDoc.exists || !progressDoc.exists) {
      throw new ApiError("Please check login status.", 404);
    }

    const questionData = questionDoc.data();
    if (questionData?.hash !== hash) {
      throw new ApiError("Wrong Answer! Think again.", 400);
    }

    const progressData = progressDoc.data() as IGameProgress;
    const questionSet = progressData.questionSet;
    const solvedQuestions = progressData.numberOfSolvedQuestions;

    const questionIndex = questionSet.findIndex(
      (q: IQuestionProgress) => q.id === questionId
    );

    if (questionIndex === -1) {
      throw new ApiError(`Question with id ${questionId} not found`, 404);
    }

    questionSet[questionIndex] = {
      ...questionSet[questionIndex],
      status: "SOLVED",
    };

    await this.updateTeamProgress(teamId, location, solvedQuestions + 1, questionSet);
    return { message: "CORRECT ANSWER" };
  }

  private async updateTeamLocation(teamId: string, location: ILocation) {
    const teamProgressRef = db.collection("gameProgress").doc(teamId);
    const geoPoint = new firestore.GeoPoint(location.latitude, location.longitude);
    await teamProgressRef.update({ lastSeenAt: geoPoint });
  }

  private async updateTeamProgress(
    teamId: string, 
    location: ILocation, 
    numberOfSolvedQuestions: number, 
    questionSet: IQuestionProgress[]
  ) {
    const teamProgressRef = db.collection("gameProgress").doc(teamId);
    const geoPoint = new firestore.GeoPoint(location.latitude, location.longitude);
    
    await teamProgressRef.update({
      lastSeenAt: geoPoint,
      numberOfSolvedQuestions,
      questionSet,
    });
  }
} 