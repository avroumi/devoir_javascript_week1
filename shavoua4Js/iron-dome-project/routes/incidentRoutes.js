import express from "express";
import {
  createIncidentController,
  updateIncidentStatusController,
  getOpenIncidentsController,
} from "../controllers/incidentController.js";

const router = express.Router();

router.get("/open", getOpenIncidentsController);
router.post("/", createIncidentController);
router.patch("/:id/status", updateIncidentStatusController);

export default router;
