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
  return jwt.sign({ id: user.id } as JWTPayload, process.env.REFRESH_TOKEN_SECRET as string, //as string
     {
    expiresIn: "7d",
  });
};

export const refreshToken = async (
  req: Request,
  res: Response 
): Promise<void> => {
  // refresh token from cookie
  const refreshToken = req.cookies.refreshToken;

  console.log(refreshToken);

  if (!refreshToken) {
    res.status(401).json({ error: "No refresh token provided" });
    return; // Early exit without returning a response
  }

  try {
    // Validate refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string 
    ) as IRefreshTokenPayload;


    if (!decoded ) {
      res.status(403).json({ error: "Invalid refresh token" });
      return; // Early exit after sending a response
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({ id: decoded?.id, role: decoded.role });

    // Send the new access token without returning
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};
