import { Router } from "express";
import { functionToHandleRequest } from "../controllers/exampleController";

const router = Router();

router.get('/', functionToHandleRequest);

export { router }