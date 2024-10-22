import { Request, Response } from 'express';
import { db } from '../config/db';

export const logout = async (req: Request, res: Response): Promise<Response> => {


//   get specific doc , weather particular team or admin using id from request.

const docRef = db.collection("admin").doc(`${"admin"}`);
const doc = await docRef.get();

  if (doc) {
    docRef.update({
    refreshToken: null,
  });
  }
  

  res.clearCookie('refreshToken'); // Clear the refresh token cookie
  return res.status(200).json({ message: 'Logged out' });
};
