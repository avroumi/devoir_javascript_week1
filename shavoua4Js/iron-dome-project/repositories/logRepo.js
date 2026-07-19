import { createRow } from "./modeleCrudRepo.js";

export const createLog = data => createRow("logs", data)