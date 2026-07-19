import express from "express";
import { createOperatorController } from "../controllers/operatorsControllers.js";

const router = express.Router();

router.post("/", createOperatorController);

export default router;
