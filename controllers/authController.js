import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "secret123"; // Ideally put this in .env

export const register = async (req, res) => {
  try {
    const { username,email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user"
    });

    console.log("✅ Registered user:", user);
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/authController.js

export const login = async (req, res) => {
  console.log("🔐 Login route HIT ✅");

  const { username, password } = req.body;
  console.log("📨 email received:", username);
  console.log("📨 Body:", req.body);

  try {
    const user = await User.findOne({ username });
    console.log("👤 Fetched user from DB:", user);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("password is match");
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secret123", { expiresIn: "1h" });

    res.json({ success: true, token, userId: user._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
