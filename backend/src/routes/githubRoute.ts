import { Router } from "express";
import { handleGetAppInformationRequest, handleGetAppInstallations, handleGetAppRepositoryInformation, handleGetCommitAnalysis, handleGetRepositoryBranches, handleGetRepositoryCommit, handleGetRepositoryCommitDiff, handleGetRepositoryCommits, handleGetUserRepositories, handleLoginGithub } from "../controllers/githubController.js";

export const router = Router();

router.get('/app', handleGetAppInformationRequest);
router.get('/app/repositories/all', handleGetAppRepositoryInformation);
router.get('/installations/all', handleGetAppInstallations);
router.post('/user/repositories', handleGetUserRepositories);
router.post('/login', handleLoginGithub);
router.post('/repository/commits', handleGetRepositoryCommits);     // gets the all commits of a repository
router.post('/repository/commit/:ref', handleGetRepositoryCommit);       // gets a specific commit of a repository
router.post('/repository/commit/:ref/diff', handleGetRepositoryCommitDiff);     // gets the git diff of a repository
router.post('/repository/commit/:ref/analysis', handleGetCommitAnalysis);
router.post('/repository/branches', handleGetRepositoryBranches);
