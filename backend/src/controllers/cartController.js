export async function getCart(req, res) {
  res.json(req.user.cart || []);
}

export async function saveCart(req, res) {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "items must be an array" });
  }
  req.user.cart = items;
  await req.user.save();
  res.json(req.user.cart);
}
