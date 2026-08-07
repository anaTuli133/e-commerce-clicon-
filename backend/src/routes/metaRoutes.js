import { Router } from "express";
import { getCategories, getHeroSlides } from "../controllers/metaController.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/hero-slides", getHeroSlides);

export default router;
