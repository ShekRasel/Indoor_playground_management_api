import express from "express";
import { fetchRoles } from "./role.controller.js";

const router = express.Router();

router.get("/", fetchRoles);

export default router;
