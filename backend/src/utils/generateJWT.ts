import fs from 'fs';
import jwt from 'jsonwebtoken';

const generateJWT = () => {
  const privateKey = fs.readFileSync('src/assets/github-app-private-key.pem', 'utf8');
  const appId = process.env.GITHUB_APP_ID ?? "";
  
  const payload = {
    iat: Math.floor(Date.now() / 1000) - 60,
    exp: Math.floor(Date.now() / 1000) + (5 * 60), 
    iss: appId
  };
  
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return token;
}


export default generateJWT;