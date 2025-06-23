import {
  createStaffSchedule,
  getStaffSchedules,
  deleteStaffSchedule,
} from "./staffSchedule.model.js";

export async function addSchedule(req, res, next) {
  try {
    const { staffId, playAreaId, shiftDate, shiftTime } = req.body;
    if (!staffId || !playAreaId || !shiftDate || !shiftTime) {
      throw new Error("All fields are required");
    }
    await createStaffSchedule({ staffId, playAreaId, shiftDate, shiftTime });
    res.json({ message: "Schedule added successfully" });
  } catch (err) {
    next(err);
  }
}

export async function fetchSchedules(req, res, next) {
  try {
    const result = await getStaffSchedules();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function removeSchedule(req, res, next) {
  try {
    const id = req.params.id;
    await deleteStaffSchedule(id);
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    next(err);
  }
}
