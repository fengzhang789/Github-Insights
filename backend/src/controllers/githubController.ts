import { Request, Response } from "express";
import { App, Octokit } from "octokit";
import generateJWT from "../utils/generateJWT.js";
import axios from "axios";
import queryString from "query-string";

export const handleGetAppInformationRequest = async (req: Request, res: Response) => {
  const octokit = new Octokit({
    auth: generateJWT()
  })

  const installationInfo = await octokit.request('GET /users/fengzhang789/installation', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  installationInfo.data.INSTALLATION_ID

  const response = await octokit.request('GET /app', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  res.send(response.data)
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
  
    res.send(response.data)
  } catch (error: any) {
    res.send(error.message)
  }
}

export const handleGetAppUserInstallations = async (req: Request, res: Response) => {
  const octokit = new Octokit({
    auth: generateJWT()
  })

  const response = await octokit.request(`GET /users/${req.body.username}/installation`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  res.send(response.data)
}

export const handleGetAppUserRepositories = async (req: Request, res: Response) => {
  const octokit = new Octokit({
    auth: generateJWT()
  })

  const response = await octokit.request(`GET /users/${req.body.username}/repos`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  res.send(response.data)
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
    
    res.send(response.data)
  } catch (error: any) {
    res.send(error.message)
  }
}

export const handleGetUserRepositories = async (req: Request<{ accessJwt: string, refreshJwt: string }>, res: Response) => {
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
  
    res.send(response.data)
  } catch (error: any) {
    console.log(error.message)
    res.send(error.message)
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