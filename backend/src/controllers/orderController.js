import Order from "../models/Order.js";

function withId(doc) {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  const { _id, ...rest } = obj;
  return { id: _id, ...rest };
}

function generateOrderId() {
  return "ORD-" + Math.floor(10000 + Math.random() * 89999);
}

export async function placeOrder(req, res) {
  const { email, billing, payment, items, subtotal, discount, tax, total } = req.body;

  if (!email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "email and items are required" });
  }

  let id = generateOrderId();
  // অত্যন্ত বিরল ক্ষেত্রে ID collision হলে আবার জেনারেট করছি
  while (await Order.exists({ _id: id })) {
    id = generateOrderId();
  }

  const order = await Order.create({
    _id: id,
    user: req.user ? req.user._id : null,
    email,
    billing,
    payment,
    items,
    subtotal,
    discount,
    tax,
    total,
    status: "Processing",
    placedOn: new Date(),
  });

  res.status(201).json(withId(order));
}

export async function trackOrder(req, res) {
  const { orderId, email } = req.query;
  if (!orderId || !email) {
    return res.status(400).json({ message: "orderId and email are required" });
  }

  const order = await Order.findOne({
    _id: new RegExp(`^${orderId}$`, "i"),
    email: String(email).toLowerCase(),
  });

  if (!order) {
    return res.status(404).json({ message: "No order found with that ID and email." });
  }

  res.json(withId(order));
}
