import { getAllRoles } from "./role.model.js";

export async function fetchRoles(req, res, next) {
  try {
    const result = await getAllRoles();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
