import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { router as githubRouter } from './routes/githubRoute.js';
import dotenv from 'dotenv';

dotenv.config()

const PORT = 5000;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/github', githubRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});