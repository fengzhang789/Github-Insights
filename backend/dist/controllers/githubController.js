var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Octokit } from "octokit";
import generateJWT from "../utils/generateJWT.js";
import axios from "axios";
import queryString from "query-string";
import { PrismaClient } from "@prisma/client";
import { llamaGenerate } from "../utils/ollamaPrompt.js";
const prisma = new PrismaClient();
export const handleGetAppInformationRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: generateJWT()
        });
        const response = yield octokit.request('GET /app', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetAppInstallations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: generateJWT()
        });
        const response = yield octokit.request('GET /app/installations', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetAppUserInstallations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: generateJWT()
        });
        const response = yield octokit.request('GET /user/installations', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetAppUserRepositories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request(`GET /users/${req.body.username}/repos`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetAppRepositoryInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: generateJWT()
        });
        const response = yield octokit.request('GET /installation/repositories', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetUserRepositories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request('GET /user/repos', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log(response.data);
        res.status(200).send(response.data);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});
export const handleLoginGithub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.code}`);
        const parsed = queryString.parse(response.data);
        console.log(parsed);
        res.status(200).send(parsed);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});
export const handleGetRepositoryCommits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const initialResponse = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits?sha=${(_a = req.body.sha) !== null && _a !== void 0 ? _a : ""}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(initialResponse.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
export const handleGetRepositoryCommit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const modifiedResponse = Object.assign(Object.assign({}, response.data), { files: response.data.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const textData = yield axios.get(file.raw_url);
                return {
                    sha: file.sha,
                    status: file.status,
                    filename: file.filename,
                    additions: file.additions,
                    deletions: file.deletions,
                    changes: file.changes,
                    blob_url: file.blob_url,
                    raw_url: file.raw_url,
                    contents_url: file.contents_url,
                    patch: file.patch,
                    fileTextContent: textData
                };
            })) });
        yield Promise.all(modifiedResponse.files);
        res.status(200).send(modifiedResponse);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetCommitAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        try {
            const commitAnalysis = yield prisma.commit.findFirstOrThrow({
                where: {
                    sha: req.params.ref
                },
                include: {
                    files: {
                        include: {
                            analysis: true
                        }
                    }
                }
            });
            return res.status(200).send(commitAnalysis);
        }
        catch (_a) {
            console.log("No commit found, creating a new one");
        }
        const response = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const diffResponse = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github.diff'
            }
        });
        // const giveContext = await 
        const commitAnalysis = yield llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Analyze the commit and provide a brief summary of what happened.`);
        const recommendedCommitMessage = yield llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Analyze the commit and write a short commit message, make it brief. Remember, this is supposed to be a commit message. Just send the commit message, dont prefix with anything or write commit message:`);
        const tags = yield llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Which out of the following tags are the most appropriate tags for this commit? 
      The possible tags: documentation, new feature, bug fix, refactor, optimization, ${req.body.tags}. Choose up to the 3 most fitting tags, DO NOT add any that are uncertain or unnecessary. 
      Tags will help users filter through commit. They can be about the nature of the commit or what part/area the code changed. Write in this format: "tag1///tag2///tag3". For example, if the best suited tags are only "new feature" and "documentation", output "new feature///documentation"`);
        const fileAnalysisPromises = response.data.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const fileAnalysis = yield llamaGenerate(`This is the diff log for a commit. Intelligently analyze what happened in the file "${file.filename}" only, no long outputs and get to the point. Don't format the text with any special characters or formatters, just one long string. \n${diffResponse.data}`);
            return Object.assign(Object.assign({}, file), { analysis: {
                    create: {
                        analysis: fileAnalysis.response,
                    }
                } });
        }));
        // Wait for all file analyses to complete
        const fileData = yield Promise.all(fileAnalysisPromises);
        // Create commit with analyzed files
        const commit = yield prisma.commit.create({
            data: {
                sha: response.data.sha,
                entireCommitAnalysis: commitAnalysis.response,
                recommendedCommitMessage: recommendedCommitMessage.response,
                tags: tags.response,
                message: response.data.commit.message,
                date: response.data.commit.committer.date,
                total: response.data.stats.total,
                additions: response.data.stats.additions,
                deletions: response.data.stats.deletions,
                files: {
                    create: fileData
                }
            },
            include: {
                files: {
                    include: {
                        analysis: true
                    }
                }
            }
        });
        res.status(200).send(commit);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});
export const handleGetRepositoryCommitDiff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github.diff'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handleGetRepositoryBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/branches`, {
            owner: req.body.owner,
            repo: req.body.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export const handlePostTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { repoName, tag } = req.body;
        // Check if the repo exists
        const repo = yield prisma.repo.findUnique({
            where: {
                repoName: repoName,
            },
        });
        if (repo) {
            // Append the tag to the existing repo's tags
            yield prisma.repo.update({
                where: {
                    repoName: repoName,
                },
                data: {
                    tags: {
                        push: tag,
                    },
                },
            });
        }
        else {
            // Create a new repo with the tag
            yield prisma.repo.create({
                data: {
                    repoName: repoName,
                    tags: [tag],
                },
            });
        }
        console.log("Tag " + tag + "added successfully");
        res.status(200).send("Tag added successfully");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
