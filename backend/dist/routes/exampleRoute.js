"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const exampleController_1 = require("../controllers/exampleController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', exampleController_1.functionToHandleRequest);
