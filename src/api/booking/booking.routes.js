import express from "express";
import { handleBooking } from "./booking.service.js";
import { getBookingCount } from "./booking.controller.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/create", handleBooking);
router.get("/count", authenticate, isAdmin, getBookingCount);

export default router;
