import { AppError } from "../utils/AppError.js";
import {
  createOperator,
  findOperatorById,
} from "../repositories/operatorsRepo.js";

export const createOperatorService = async (data = {}) => {
  const { name, rank } = data;
  if (!name || typeof name !== "string") {
    throw new AppError("Invalid name data", 400);
  }
  if (!rank || typeof rank !== "string") {
    throw new AppError("Invalid rank data", 400);
  }

  const operatorId = await createOperator({ name, rank });

  return findOperatorById(operatorId);
};

export const getOperatorByIdService = async (id) => {
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    throw new AppError("id must be a positive integer", 400);
  }
  const operator = await findOperatorById(numId);
  if (!operator) {
    throw new AppError("Operator not found ", 404);
  }
  return operator;
};
