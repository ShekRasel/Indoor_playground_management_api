import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "./role.model.js";

export async function fetchRoles(req, res, next) {
  try {
    const result = await getAllRoles();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function addRole(req, res, next) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a string" });
    }

    const newRole = await createRole(title);
    res.status(201).json(newRole);
  } catch (err) {
    next(err);
  }
}

export async function modifyRole(req, res, next) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a string" });
    }

    const updated = await updateRole(Number(id), title);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeRole(req, res, next) {
  try {
    const { id } = req.params;

    const result = await deleteRole(Number(id));
    res.json(result);
  } catch (err) {
    next(err);
  }
}
