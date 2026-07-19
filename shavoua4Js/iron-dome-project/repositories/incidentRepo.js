import { createRow, findById, updateRow } from "./modeleCrudRepo.js";
import pool from "../db/database.js";

const tableName = "incidents";

export const createIncident = (data) => createRow(tableName, data);

export const findIncidentById = (id) => findById(tableName, id);

export const updateIncidentStatus = (id, status) =>
  updateRow(tableName, id, { status });

export const findOpenIncidents = async () => {
  const [result] = await pool.execute(
    `select * from incidents where status != ? `,
    ["CLOSED"],
  );
  return result;
};
