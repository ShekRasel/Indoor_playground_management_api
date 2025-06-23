import express from "express";
import {
  addResponsibility,
  fetchResponsibilities,
  removeResponsibility,
} from "./responsibility.controller.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, addResponsibility);
router.get("/", fetchResponsibilities);
router.delete("/:id", authenticate, isAdmin, removeResponsibility);

export default router;
