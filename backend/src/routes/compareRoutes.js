import { Router } from "express";
import { getCompare, saveCompare } from "../controllers/compareController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getCompare);
router.put("/", protect, saveCompare);

export default router;
