import { Router } from "express";
import { placeOrder, trackOrder } from "../controllers/orderController.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();

// নোট: /track রুটটা /:id এর আগে define করতে হবে, নাহলে Express "track" কে id হিসেবে ধরে ফেলবে
router.get("/track", trackOrder);
router.post("/", optionalAuth, placeOrder);

export default router;
