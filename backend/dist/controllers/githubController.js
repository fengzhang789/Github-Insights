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
export const handleGetAppInformationRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = new Octokit({
        auth: generateJWT()
    });
    const installationInfo = yield octokit.request('GET /users/fengzhang789/installation', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    installationInfo.data.INSTALLATION_ID;
    const response = yield octokit.request('GET /app', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    res.send(response.data);
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
        res.send(response.data);
    }
    catch (error) {
        res.send(error.message);
    }
});
export const handleGetAppUserInstallations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = new Octokit({
        auth: generateJWT()
    });
    const response = yield octokit.request(`GET /users/${req.body.username}/installation`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    res.send(response.data);
});
export const handleGetAppUserRepositories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = new Octokit({
        auth: generateJWT()
    });
    const response = yield octokit.request(`GET /users/${req.body.username}/repos`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    res.send(response.data);
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
        res.send(response.data);
    }
    catch (error) {
        res.send(error.message);
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
        res.send(response.data);
    }
    catch (error) {
        console.log(error.message);
        res.send(error.message);
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
    try {
        const octokit = new Octokit({
            auth: req.body.accessJwt
        });
        const response = yield octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.send(response.data);
    }
    catch (error) {
        res.send(error.message);
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
        res.send(response.data);
    }
    catch (error) {
        res.send(error.message);
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
        res.send(response.data);
    }
    catch (error) {
        res.send(error.message);
    }
});
