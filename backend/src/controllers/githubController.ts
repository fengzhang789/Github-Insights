import { Request, Response } from "express";
import { App, Octokit } from "octokit";
import generateJWT from "../utils/generateJWT.js";
import axios from "axios";
import queryString from "query-string";
import { TCommitInfo } from "../typings/commit.js";
import { PrismaClient } from "@prisma/client";
import { llamaGenerate } from "../utils/ollamaPrompt.js";

const prisma = new PrismaClient();

export const handleGetAppInformationRequest = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: generateJWT()
    })
  
    const response = await octokit.request('GET /app', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  
    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetAppInstallations = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: generateJWT()
    })
  
    const response = await octokit.request('GET /app/installations', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  
    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetAppUserInstallations = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: generateJWT()
    })
  
    const response = await octokit.request('GET /user/installations', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  
    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetAppUserRepositories = async (req: Request<{ accessJwt: string }>, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const response = await octokit.request(`GET /users/${req.body.username}/repos`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetAppRepositoryInformation = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: generateJWT()
    })
  
    const response = await octokit.request('GET /installation/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    
    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetUserRepositories = async (req: Request<{ accessJwt: string }>, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const response = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(response.data)
  
    res.status(200).send(response.data)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}


export const handleLoginGithub = async (req: Request<{ code: string }>, res: Response) => {
  try {
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.code}`)
    const parsed = queryString.parse(response.data)

    console.log(parsed)
    res.status(200).send(parsed)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}

export const handleGetRepositoryCommits = async (req: Request<{ owner: string, repo: string, accessJwt: string, sha?: string }>, res: Response<TCommitInfo>) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const initialResponse = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits?sha=${req.body.sha ?? ""}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    res.status(200).send(initialResponse.data)
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

export const handleGetRepositoryCommit = async (req: Request<{ owner: string, repo: string, accessJwt: string, ref: string }>, res: Response<TCommitInfo>) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const response = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const modifiedResponse = {
      ...response.data,
      files: response.data.files.map(async (file: any) => {
        const textData = await axios.get(file.raw_url)

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
        }
      })
    }

    await Promise.all(modifiedResponse.files)

    res.status(200).send(modifiedResponse)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetCommitAnalysis = async (req: Request<{ owner: string, repo: string, accessJwt: string, ref: string, tags: string }>, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    });

    try {
      const commitAnalysis = await prisma.commit.findFirstOrThrow({
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
    } catch {
      console.log("No commit found, creating a new one");
    }

    const response = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const diffResponse = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'accept': 'application/vnd.github.diff'
      }
    });

    // const giveContext = await 
    const commitAnalysis = await llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Analyze the commit and provide a brief summary of what happened.`);
    const recommendedCommitMessage = await llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Analyze the commit and write a short commit message, make it brief. Remember, this is supposed to be a commit message. Just send the commit message, dont prefix with anything or write commit message:`); 
  
    const tags = await llamaGenerate(`This is the diff log for a commit. ${diffResponse.data}\n\n Which out of the following tags are the most appropriate tags for this commit? 
      The possible tags: documentation, new feature, bug fix, refactor, optimization, ${req.body.tags}. Choose up to the 3 most fitting tags, DO NOT add any that are uncertain or unnecessary. 
      Tags will help users filter through commits and easily understand the commit. Write in this format: "tag1///tag2///tag3". For example, if the best suited tags are only "new feature" and "documentation", output "new feature///documentation"`);

    const fileAnalysisPromises = response.data.files.map(async (file: any) => {
      const fileAnalysis = await llamaGenerate(`This is the diff log for a commit. Intelligently analyze what happened in the file "${file.filename}" only, no long outputs and get to the point. Don't format the text with any special characters or formatters, just one long string. \n${diffResponse.data}`);

      return {
        ...file,
        analysis: {
          create: {
            analysis: fileAnalysis.response,
          }
        }
      };
    });

    // Wait for all file analyses to complete
    const fileData = await Promise.all(fileAnalysisPromises);

    // Create commit with analyzed files
    const commit = await prisma.commit.create({
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
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}


export const handleGetRepositoryCommitDiff = async (req: Request<{ owner: string, repo: string, accessJwt: string, ref: string }>, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const response = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/commits/${req.params.ref}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'accept': 'application/vnd.github.diff'
      }
    })

    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const handleGetRepositoryBranches = async (req: Request<{ owner: string, repo: string, accessJwt: string }>, res: Response) => {
  try {
    const octokit = new Octokit({
      auth: req.body.accessJwt
    })

    const response = await octokit.request(`GET /repos/${req.body.owner}/${req.body.repo}/branches`, {
      owner: req.body.owner,
      repo: req.body.repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    res.status(200).send(response.data)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
