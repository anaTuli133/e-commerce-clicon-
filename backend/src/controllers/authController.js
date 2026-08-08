import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const user = await User.create({ name, email, password, provider: "local" });
  const token = generateToken(user._id);
  res.status(201).json({ user: user.toPublicJSON(), token });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || user.provider !== "local") {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  res.json({ user: user.toPublicJSON(), token });
}


export async function googleAuth(req, res) {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ message: "Missing Google credential" });
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Google token" });
  }

  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ $or: [{ googleId }, { email: email.toLowerCase() }] });

  if (!user) {
    user = await User.create({
      name,
      email,
      googleId,
      avatar: picture,
      provider: "google",
    });
  } else if (!user.googleId) {
    user.googleId = googleId;
    user.avatar = user.avatar || picture;
    await user.save();
  }

  const token = generateToken(user._id);
  res.json({ user: user.toPublicJSON(), token });
}

export async function logout(req, res) {
  // JWT stateless 
  res.json({ success: true });
}

export async function me(req, res) {
  res.json({ user: req.user.toPublicJSON() });
}
