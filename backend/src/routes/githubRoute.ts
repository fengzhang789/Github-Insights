import { Router } from "express";
import { handleGetAppInformationRequest, handleGetAppInstallations, handleGetAppRepositoryInformation, handleGetUserRepositories, handleLoginGithub } from "../controllers/githubController.js";

export const router = Router();

router.get('/app', handleGetAppInformationRequest);
router.get('/app/repositories/all', handleGetAppRepositoryInformation);
router.get('/installations/all', handleGetAppInstallations);
router.get('/user/repositories', handleGetUserRepositories);
router.post('/login', handleLoginGithub);