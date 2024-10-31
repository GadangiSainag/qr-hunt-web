import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, JWTPayload } from "./adminControllers";
import { db } from "../config/db";

interface IRefreshTokenPayload {
  id: string;
  role:'admin' | 'player';
}

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign({ id: user.id, role: user.role } as JWTPayload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign({ id: user.id, role: user.role } as JWTPayload, process.env.REFRESH_TOKEN_SECRET as string, //as string
     {
    expiresIn: "7d",
  });
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Get the refresh token from cookies

  const refreshToken = req.cookies.refreshToken;


  if (!refreshToken) {
    res.status(404).json({ error: "No refresh token provided" });
    return; // Exit if there's no token
  }

  try {
    // Validate refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as IRefreshTokenPayload;

    if (!decoded) {
      res.status(403).json({ error: "Invalid refresh token" });
      return; // Exit if token is invalid
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });
    console.log("new Tkn sent")
    // Send the new access token in the response
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};