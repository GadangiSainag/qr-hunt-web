import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/'; // Import all routes


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

app.use(urlencoded({ extended: true }));


// Routes
app.use('/api', routes);

export default app;
