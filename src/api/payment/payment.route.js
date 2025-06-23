import express from "express";
import { addPayment, fetchAllPayments } from "./payment.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, addPayment); // any logged in customer
router.get("/", authenticate, isAdmin, fetchAllPayments); // admin only

export default router;
