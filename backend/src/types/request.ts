import { Request } from "express";
import { IUser, ILocation } from "./models";

export interface IAuthenticatedRequest extends Request {
  user?: IUser;
}

export interface ITeamAuthRequest {
  teamId: string;
  hash: string;
  location: ILocation;
}

export interface IAnswerValidationRequest {
  questionId: string;
  hash: string;
  location: ILocation;
}

export interface ILocationUpdateRequest {
  location: ILocation;
} 