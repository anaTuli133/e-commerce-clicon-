export async function getWishlist(req, res) {
  res.json(req.user.wishlist || []);
}

export async function saveWishlist(req, res) {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "items must be an array" });
  }
  req.user.wishlist = items;
  await req.user.save();
  res.json(req.user.wishlist);
}
