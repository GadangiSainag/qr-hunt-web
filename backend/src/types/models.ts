import { firestore } from "firebase-admin";

export interface IQuestion {
  customId: string;
  difficulty: string;
  questionText: string;
  hint: string;
  hash: string;
}

export interface ITeam {
  id: string;
  teamName: string;
  hash: string;
  players: string[];
  huntId: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IQuestionProgress {
  id: string;
  text: string;
  difficulty: string;
  status: "PENDING" | "SOLVED";
}

export interface IGameProgress {
  teamId: string;
  numberOfSolvedQuestions: number;
  questionSet: IQuestionProgress[];
  lastSeenAt: firestore.GeoPoint;
}

export interface IUser {
  id: string;
  role: "admin" | "player";
} 