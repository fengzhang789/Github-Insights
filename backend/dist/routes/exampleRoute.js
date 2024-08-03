import { Router } from "express";
import { functionToHandleRequest } from "../controllers/exampleController.js";
const router = Router();
router.get('/', functionToHandleRequest);
export { router };
