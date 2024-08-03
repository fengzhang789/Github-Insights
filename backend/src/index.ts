import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { router as exampleRouter } from './routes/exampleRoute.js';
import { Octokit, App } from "octokit";
import dotenv from 'dotenv';

dotenv.config()

const PORT = 5000;
const app = express();
const prisma = new PrismaClient();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

app.use(cors());
app.use(express.json());

app.use('/example', exampleRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

app.get('/listCommits', async (req: Request, res: Response) => {
  try {
    let owner = 'fengzhang789'
    let repo = 'hackthe6ix'
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: owner, // req.owner
      repo: repo, // req.repo
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch list of commits' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
