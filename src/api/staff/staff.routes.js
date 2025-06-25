import { Router } from "express";
import { signup, login, getAllStaff, deleteStaff } from "./staff.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/allStaff", authenticate, isAdmin, getAllStaff);
router.delete("/:id", authenticate, isAdmin, deleteStaff);

export default router;
