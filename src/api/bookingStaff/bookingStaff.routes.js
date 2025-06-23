import express from "express";
import {
  addBookingStaff,
  fetchBookingStaffs,
} from "./bookingStaff.controller.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, addBookingStaff);
router.get("/", authenticate, fetchBookingStaffs);

export default router;
