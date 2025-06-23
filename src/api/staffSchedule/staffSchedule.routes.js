import express from "express";
import {
  addSchedule,
  fetchSchedules,
  removeSchedule,
} from "./staffSchedule.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, addSchedule);
router.get("/", authenticate, fetchSchedules);
router.delete("/:id", authenticate, isAdmin, removeSchedule);

export default router;
