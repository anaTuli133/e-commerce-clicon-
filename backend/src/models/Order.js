import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    _id: { type: String }, // e.g. "ORD-84213"
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // guest checkout হলে null
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    billing: { type: mongoose.Schema.Types.Mixed },
    payment: { type: String },
    items: { type: [orderItemSchema], default: [] },
    subtotal: Number,
    discount: Number,
    tax: Number,
    total: Number,
    status: { type: String, default: "Processing" },
    placedOn: { type: Date, default: Date.now },
  },
  { timestamps: true, _id: false }
);

export default mongoose.model("Order", orderSchema);
