var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { router as exampleRouter } from './routes/exampleRoute.js';
import { Octokit } from "octokit";
import dotenv from 'dotenv';
dotenv.config();
const PORT = 5000;
const app = express();
const prisma = new PrismaClient();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
app.use(cors());
app.use(express.json());
app.use('/example', exampleRouter);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error(error);
    }
}));
app.get('/listCommits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let owner = 'fengzhang789';
        let repo = 'hackthe6ix';
        const response = yield octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: owner, // req.owner
            repo: repo, // req.repo
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log(response);
        res.send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch list of commits' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
