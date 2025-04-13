import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/'; // Import all routes
const cookieParser = require('cookie-parser');
import cors from "cors";


dotenv.config();

const app = express();  

import { Request, Response, NextFunction } from "express";

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin: string) => origin.trim());

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



// Middlewares
app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use('/api', routes);

export default app;
