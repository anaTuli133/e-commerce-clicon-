import { Router } from "express";
import { placeOrder, trackOrder } from "../controllers/orderController.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();


router.get("/track", trackOrder);
router.post("/", optionalAuth, placeOrder);

export default router;
