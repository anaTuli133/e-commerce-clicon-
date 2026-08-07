import mongoose from "mongoose";

const shippingLineSchema = new mongoose.Schema(
  { label: String, value: String },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // ফ্রন্টএন্ডের সাথে সামঞ্জস্য রাখতে custom string id ব্যবহার করছি (যেমন "p1", "macbook-pro")
    _id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    badge: { type: String, default: null },
    category: { type: String, required: true, index: true },
    brand: { type: String, index: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    stock: { type: String, default: "In Stock" },
    sku: { type: String },
    company: { type: String },
    colors: { type: [String], default: undefined },
    sizes: { type: [String], default: undefined },
    memoryOptions: { type: [String], default: undefined },
    storageOptions: { type: [String], default: undefined },
    description: { type: String },
    features: { type: [String], default: undefined },
    shipping: { type: [shippingLineSchema], default: undefined },
  },
  { timestamps: true, _id: false }
);

productSchema.index({ name: "text" });

export default mongoose.model("Product", productSchema);
