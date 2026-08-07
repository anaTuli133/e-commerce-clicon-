import { Router } from "express";
import { getCart, saveCart } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getCart);
router.put("/", protect, saveCart);

export default router;
