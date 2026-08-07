export function requireAdminKey(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ message: "ADMIN_KEY is not set on the server" });
  }
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Invalid or missing x-admin-key header" });
  }
  next();
}
 