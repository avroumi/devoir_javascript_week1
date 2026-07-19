import { AppError } from "../utils/AppError.js";
import {
  createIncident,
  findIncidentById,
  updateIncidentStatus,
  findOpenIncidents,
} from "../repositories/incidentRepo.js";
import { getOperatorByIdService } from "./operatorsServices.js";
import { createLog } from "../repositories/logRepo.js";

export const createIncidentService = async (data = {}) => {
  const validThreatLevel = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const { codeName, threatLevel, operatorId } = data;

  if (!codeName || typeof codeName !== "string") {
    throw new AppError("Invalid codename", 400);
  }
  if (!threatLevel || !validThreatLevel.includes(threatLevel)) {
    throw new AppError("Invalid threatLevlel", 400);
  }

  const numOperatorId = Number(operatorId);
  if (!Number.isInteger(numOperatorId) || numOperatorId <= 0) {
    throw new AppError("Invalid operator id , must be a positive integer", 400);
  }

  await getOperatorByIdService(numOperatorId);
  const incidentId = await createIncident({
    code_name: codeName,
    threat_level: threatLevel,
    operator_id: numOperatorId,
    status: "OPEN",
  });
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError("Incident creation failed", 500);
  }
  await createLog({
    action: "INCIDENT_CREATED",
    incident_id: incidentId,
    operator_id: numOperatorId,
    description: "New incident created",
  });

  return incident;
};

export const updateIncidentStatusService = async (id, data = {}) => {
  const numIncidentId = Number(id);
  if (!Number.isInteger(numIncidentId) || numIncidentId <= 0) {
    throw new AppError("Id must be a positive", 400);
  }
  const incident = await findIncidentById(numIncidentId);
  if (!incident) {
    throw new AppError("Incident not found", 404);
  }
  const validStatus = ["OPEN", "TRACKING", "INTERCEPTED", "CLOSED"];
  const { status } = data;

  if (!validStatus.includes(status)) {
    throw new AppError(`status must be in a list : ${validStatus}`, 400);
  }
  const updated = await updateIncidentStatus(numIncidentId, status);
  if (!updated) {
    throw new AppError("Incident status update failed", 500);
  }

  await createLog({
    action: "STATUS_UPDATED",
    incident_id: numIncidentId,
    operator_id: incident.operator_id,
    description: `Status changed to ${status}`,
  });

  const updatedIncident = await findIncidentById(numIncidentId);

  return updatedIncident;
};

export const findOpenIncidentsService = async () => {
  const openIncidents = await findOpenIncidents();
  return openIncidents;
};
