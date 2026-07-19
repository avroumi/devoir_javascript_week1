import {
  createIncidentService,
  findOpenIncidentsService,
  updateIncidentStatusService,
} from "../services/incidentServices.js";

export const createIncidentController = async (req, res, next) => {
  try {
    const created = await createIncidentService(req.body);
    res.status(201).json({
      message: "Incident created",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

export const updateIncidentStatusController = async (req, res, next) => {
  try {
    const query = req.params.id;
    const status = req.body;
    const data = await updateIncidentStatusService(query, status);
    res.status(200).json({
      message: "updated succesfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOpenIncidentsController = async (req, res, next) => {
  try {
    const data = await findOpenIncidentsService();
    res.status(200).json({
      message: "Open incidents",
      data,
    });
  } catch (error) {
    next(error);
  }
};
