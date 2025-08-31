const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { getIO } = require("../socket");

const router = express.Router();
const SECRET_KEY = "mysecretkey";

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

// GET /api/users
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // hide password
    res.json(users.map(el=>({
      id:el._id,
      name:el.name,
      role:el.role,
      email:el.email
  })));
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// POST /api/users
router.post("/", 
  // verifyToken, 
  
  async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save();
     const io = getIO();
    io.to("admin").emit("adminNotification", {
      type: "USER_CREATED",
      message: `A new user "${name}" has been created`,
      newUser,
    });

    res.status(201).json({ id: newUser._id, name, email, role });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

module.exports = router;
