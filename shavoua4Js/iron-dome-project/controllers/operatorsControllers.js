import { createOperatorService } from "../services/operatorsServices.js";

export const createOperatorController = async (req, res, next) => {
  try {
    const operator = await createOperatorService(req.body);
    res.status(201).json({
      message: "created succesfully",
      data: operator,
    });
  } catch (error) {
    next(error);
  }
};
