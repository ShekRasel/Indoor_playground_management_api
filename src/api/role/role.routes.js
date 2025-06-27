import express from "express";
import {
  addRole,
  fetchRoles,
  modifyRole,
  removeRole,
} from "./role.controller.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/", fetchRoles);
router.post("/", authenticate, isAdmin, addRole);
router.put("/:id", authenticate, isAdmin, modifyRole); // Update Role
router.delete("/:id", authenticate, isAdmin, removeRole);

export default router;
