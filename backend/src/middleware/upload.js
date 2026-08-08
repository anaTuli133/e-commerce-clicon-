import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clicon-products", 
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],

    public_id: (req, file) => {
      const base = file.originalname
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `${base}-${Date.now()}`;
    },
  },
});

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.has(file.mimetype)) {
    return cb(new Error("শুধু jpeg/png/webp/gif ছবি আপলোড করা যাবে"));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});