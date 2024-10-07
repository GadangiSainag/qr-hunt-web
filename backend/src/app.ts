import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/'; // Import all routes
// import { connectDB } from './config/db'; // Import DB connection

dotenv.config();

const app = express();

// Middlewares
app.use(json());

app.use(urlencoded({ extended: true }));

// Database connection
// connectDB();

// Routes
app.use('/api', routes);

export default app;
