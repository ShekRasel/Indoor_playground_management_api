import { Router } from "express";
import { getPlayAreas } from "./playarea.controller.js";

const router = Router();

router.get("/", getPlayAreas);

export default router;
