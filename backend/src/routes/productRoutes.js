import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, uploadProductImage } from "../controllers/productController.js";
import { requireAdminKey } from "../middleware/adminKey.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", requireAdminKey, createProduct); 
router.put("/:id", requireAdminKey, updateProduct);
router.delete("/:id", requireAdminKey, deleteProduct);
router.post("/upload-image", requireAdminKey, upload.single("image"), uploadProductImage); 

export default router;