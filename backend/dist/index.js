"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const exampleRoute_1 = require("./routes/exampleRoute");
const octokit_1 = require("octokit");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = 5000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const octokit = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/example', exampleRoute_1.router);
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
