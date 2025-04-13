import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/'; // Import all routes
import cookieParser from 'cookie-parser';
import cors from "cors";
import { errorHandler } from './middlewares/error.middleware';
import { rateLimiter, securityHeaders, corsErrorHandler } from './middlewares/security.middleware';

dotenv.config();

const app = express();  

import { Request, Response, NextFunction } from "express";

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin: string) => origin.trim());

// Security middleware
app.use(securityHeaders);
app.use(rateLimiter);

// Body parsing middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use('/api', routes);

// Error handling middleware (must be after routes)
app.use(corsErrorHandler);
app.use(errorHandler);

export default app;
