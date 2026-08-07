const MAX_COMPARE = 4;

export async function getCompare(req, res) {
  res.json(req.user.compare || []);
}

export async function saveCompare(req, res) {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "items must be an array" });
  }
  req.user.compare = items.slice(0, MAX_COMPARE);
  await req.user.save();
  res.json(req.user.compare);
}
