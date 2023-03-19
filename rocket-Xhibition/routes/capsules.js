import express from "express";
import { getCapsules, getCapsule } from "../connectors/capsules.js";

const router = express.Router();

router.get("/capsules", getCapsules);
router.get("/capsules/:capsule_serial", getCapsule);

export default router;
