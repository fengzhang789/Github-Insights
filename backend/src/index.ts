import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { router as exampleRouter } from './routes/exampleRoute';

const PORT = 5000;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/example', exampleRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
