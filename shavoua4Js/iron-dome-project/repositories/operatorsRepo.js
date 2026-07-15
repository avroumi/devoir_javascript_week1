import { createRow, findById } from "./modeleCrudRepo.js";

export const createOperator = async (data) => createRow("operators", data)

export const findOperatorById = async (id) => findById("operators", id)