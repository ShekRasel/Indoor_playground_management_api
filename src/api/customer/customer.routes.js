import { Router } from "express";
import {
  signup,
  login,
  getCustomers,
  deleteCustomer,
} from "./customer.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { isAdmin } from "../../middleware/isAdmin.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/allCustomers", authenticate, isAdmin, getCustomers);
router.delete("/remove/:id", authenticate, isAdmin, deleteCustomer);

export default router;
