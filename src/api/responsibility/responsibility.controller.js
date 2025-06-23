import {
  createResponsibility,
  getResponsibilities,
  deleteResponsibility,
} from "./responsibility.model.js";

export async function addResponsibility(req, res, next) {
  try {
    const { roleId, text } = req.body;
    if (!roleId || !text) throw new Error("roleId and text are required");
    await createResponsibility({ roleId, text });
    res.json({ message: "Responsibility added successfully" });
  } catch (err) {
    next(err);
  }
}

export async function fetchResponsibilities(req, res, next) {
  try {
    const result = await getResponsibilities();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function removeResponsibility(req, res, next) {
  try {
    const id = req.params.id;
    await deleteResponsibility(id);
    res.json({ message: "Responsibility deleted" });
  } catch (err) {
    next(err);
  }
}

