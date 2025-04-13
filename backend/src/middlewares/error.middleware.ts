import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError } from '../types/response';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      status: err.status
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 