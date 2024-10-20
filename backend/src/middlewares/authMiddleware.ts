import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export interface User {
  id: string;
  password: number;
}

export interface IAuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticateToken: (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // req.header.authorization = `Bearer <jwt Token>`
  // Obtaining only accessToken from header, removing 'Bearer '
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    // If needed in future, this can add details to request and send it to next approprate endpoint 
    // (access it as const user = req.user)
    // req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Access token is invalid or expired" });
  }
};
